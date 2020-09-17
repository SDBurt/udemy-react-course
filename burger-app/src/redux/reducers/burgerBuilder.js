import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    SET_ERROR,
    CLEAR_ERROR
} from '../types';

const INGREDIENT_PRICES = {
    salad: 0.75,
    cheese: 0.75,
    meat: 1.50,
    bacon: 1.25
}

const INITIAL_PRICE = 4.0

const initialState = {
    ingredients: null,
    totalPrice: INITIAL_PRICE,
    error: false,
    building: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true

            };
        case SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: INITIAL_PRICE,
                building: false
            };

        case SET_ERROR:
            return {
                ...state,
                error: true
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: false
            };
        default:
            return state;
    }
}

