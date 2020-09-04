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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {

        this.setState({ loading: true })

        // Not realistic to have price here in the front end
        // someone could change it before it is sent
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max Schwarzmuller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '13412341',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'takeout'

        }
        axios.post('/orders', order)
            .then(res => {
                console.log("order: ", res);
                this.setState({ loading: false, purchasing: false })
            })
            .catch(err => {
                console.error("error: ", err)
                this.setState({ loading: false, purchasing: false })
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

    //Add
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

    //remove
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

        let orderSummary = (<OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />)

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
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios)
