import React, { useState } from 'react';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import checkValidity from '../../../validation/formValidation';

import { purchaseBurger } from '../../../redux/actions/order'

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            validation: {},
            value: 'fastest',
            valid: true,
        },
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for (let element in orderForm) {
            formData[element] = orderForm[element].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onPurchaseBurger(order, props.token)
    };

    const inputChangedHandler = (event, inputId) => {

        const currOrderForm = {
            ...orderForm
        };
        const updatedFormElement = {
            ...currOrderForm[inputId]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        currOrderForm[inputId] = updatedFormElement;

        let formIsValid = true;

        for (let identifier in currOrderForm) {
            formIsValid = currOrderForm[identifier].value && formIsValid
        }

        setOrderForm(currOrderForm);
        setFormIsValid(formIsValid);

    }



    const formElements = []
    for (let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElements.map(element => (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    changed={(event) => inputChangedHandler(event, element.id)}
                    touched={element.config.touched}
                />
            ))}
            <Button clicked={orderHandler} btnType="Success" disabled={!formIsValid}>Order</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    };

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data.</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        onPurchaseBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }

}

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(ContactData, axios));