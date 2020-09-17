import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'


import { purchaseBurger } from '../../../redux/actions/order'

class ContactData extends Component {

    state = {
        orderForm: {
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
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onPurchaseBurger(order, this.props.token)
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase());
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    inputChangedHandler = (event, inputId) => {

        const orderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...orderForm[inputId]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        orderForm[inputId] = updatedFormElement;

        let formIsValid = true;

        for (let identifier in orderForm) {
            formIsValid = orderForm[identifier].value && formIsValid
        }

        this.setState({
            orderForm: orderForm,
            formIsValid: formIsValid
        })
    }

    render() {

        const formElements = []
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(element => (
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                        touched={element.config.touched}
                    />
                ))}
                <Button clicked={this.orderHandler} btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        };

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data.</h4>
                {form}
            </div>
        )
    }
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