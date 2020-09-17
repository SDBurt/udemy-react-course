import {
    ORDER_PURCHASE_START,
    ORDER_PURCHASE_SUCCESS,
    ORDER_PURCHASE_FAIL,
    ORDER_PURCHASE_INIT,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS
} from '../types';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ORDER_PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case ORDER_PURCHASE_START:
            return {
                ...state,
                loading: true
            };

        case ORDER_PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }

            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };

        case ORDER_PURCHASE_FAIL:
            return {
                ...state,
                loading: false
            };

        case FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };

        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        case FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
}

