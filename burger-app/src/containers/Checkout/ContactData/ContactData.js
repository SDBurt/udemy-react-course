import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log(this.props.ingredients)

        this.setState({ loading: true })
        // Not realistic to have price here in the front end
        // someone could change it before it is sent
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        axios.post('orders.json', order)
            .then(res => {
                console.log("order: ", res);
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(err => {
                console.error("error: ", err)
                this.setState({ loading: false })
            });


    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street Address" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button clicked={this.orderHandler} btnType="Success">Order</Button>
            </form>
        );

        if (this.state.loading) {
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

export default ContactData