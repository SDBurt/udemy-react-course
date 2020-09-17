import React, { Component } from 'react'
import { connect } from "react-redux";

import axios from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

import {
    addIngredient,
    removeIngredient,
    initIngredients
} from '../../redux/actions/burgerBuilder'

import { initPurchase } from '../../redux/actions/order';
import { setAuthRedirectPath } from '../../redux/actions/auth';


export class BurgerBuilder extends Component {

    // Local States
    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
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
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        }

    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        // When ingredients load, 
        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        order={this.purchaseHandler}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                    />
                </React.Fragment>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.props.price}
                />
            );
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapActionsToProps = (dispatch) => {
    return {
        onAddIngredient: (ing) => dispatch(addIngredient(ing)),
        onRemoveIngredient: (ing) => dispatch(removeIngredient(ing)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(initPurchase()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(BurgerBuilder, axios))
