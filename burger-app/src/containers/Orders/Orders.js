import React, { Component } from 'react'

import { connect } from 'react-redux'
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { fetchOrders } from '../../redux/actions/order'
import Spinner from '../../components/UI/Spinner/Spinner'

export class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {


        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                < Order key={order.key} ingredients={order.ingredients} price={order.price} />
            ))
        }

        return (<div> {orders}</div>)
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(Orders, axios))