import React, { Component } from 'react'
import { connect } from "react-redux";

import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

// import { addIngredient, removeIngredient } from '../../redux/actions/actions'
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../redux/types';




export class BurgerBuilder extends Component {

    // Local States
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data })
        //     })
        //     .catch(err => {
        //         this.setState({ error: true })
        //     })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        // When ingredients load, 
        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredinetAdded}
                        ingredientRemoved={this.props.onIngredinetRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        order={this.purchaseHandler}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                    />
                </React.Fragment>
            )

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.props.price}
                />
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }



        return (
            <React.Fragment>
                <Modal
                    showModal={this.state.purchasing}
                    hideModal={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        onIngredinetAdded: (ingName) => dispatch({ type: ADD_INGREDIENT, ingredientName: ingName }),
        onIngredinetRemoved: (ingName) => dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName }),
    }

};

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(BurgerBuilder, axios))
