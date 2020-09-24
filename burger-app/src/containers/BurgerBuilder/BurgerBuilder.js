import React, { useState, useEffect } from 'react'
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

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const { onInitIngredients } = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout');
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        }

    }


    const disabledInfo = {
        ...props.ings
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = (disabledInfo[key] <= 0)
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    // When ingredients load, 
    if (props.ings) {
        burger = (
            <React.Fragment>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onAddIngredient}
                    ingredientRemoved={props.onRemoveIngredient}
                    disabled={disabledInfo}
                    price={props.price}
                    order={purchaseHandler}
                    purchaseable={updatePurchaseState(props.ings)}
                    isAuth={props.isAuthenticated}
                />
            </React.Fragment>
        );

        orderSummary = (
            <OrderSummary
                ingredients={props.ings}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler}
                price={props.price}
            />
        );
    }

    if (props.loading) {
        orderSummary = <Spinner />;
    }



    return (
        <React.Fragment>
            <Modal
                showModal={purchasing}
                hideModal={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}

        </React.Fragment>
    );

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
