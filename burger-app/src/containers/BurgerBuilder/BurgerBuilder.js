import React, { Component } from 'react'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../axios-orders'


const INGREDIENT_PRICES = {
    salad: 0.75,
    cheese: 0.75,
    meat: 1.50,
    bacon: 1.25
}

export class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(err => {
                this.setState({ error: true })
            })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })

        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) + '='
                + encodeURIComponent(this.state.ingredients[i])
            )
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({ purchaseable: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    // Add
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngrediants = {
            ...this.state.ingredients
        }

        updatedIngrediants[type] = updatedCount

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngrediants
        })
        this.updatePurchaseState(updatedIngrediants)
    }

    // remove
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngrediants = {
            ...this.state.ingredients
        }

        updatedIngrediants[type] = updatedCount

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngrediants
        })
        this.updatePurchaseState(updatedIngrediants)
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        // When ingredients load, 
        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        order={this.purchaseHandler}
                        purchaseable={this.state.purchaseable}
                    />
                </React.Fragment>
            )

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)
