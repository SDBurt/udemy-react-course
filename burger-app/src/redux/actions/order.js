import axios from '../../axios-orders'

import {
    ORDER_PURCHASE_START,
    ORDER_PURCHASE_SUCCESS,
    ORDER_PURCHASE_FAIL,
    ORDER_PURCHASE_INIT,
    FETCH_ORDERS_START,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_SUCCESS
} from '../types'

export const purchaseSuccess = (id, data) => {
    return {
        type: ORDER_PURCHASE_SUCCESS,
        orderId: id,
        orderData: data
    }
}

export const purchaseFail = (error) => {
    return {
        type: ORDER_PURCHASE_FAIL,
        error: error
    }
}

export const purchaseStart = (orderData) => {
    return {
        type: ORDER_PURCHASE_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post(`orders.json?auth=${token}`, orderData)
            .then(res => {
                dispatch(purchaseSuccess(res.data.name, orderData))
            })
            .catch(err => {
                dispatch(purchaseFail(err))
            });
    }
}

export const initPurchase = () => dispatch => {
    dispatch({
        type: ORDER_PURCHASE_INIT
    })
}

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart)
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        key: key
                    });
                }
                console.log(fetchedOrders)
                dispatch(fetchOrdersSuccess(fetchedOrders))

            })
            .catch(err => {
                console.log(err)
                dispatch(fetchOrdersFail(err))
            })

    }

}