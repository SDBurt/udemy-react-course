import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENTS, SET_ERROR, CLEAR_ERROR } from '../../redux/types';
import axios from '../../axios-orders'

// Add
export const addIngredient = ingName => {
    return {
        type: ADD_INGREDIENT,
        ingredientName: ingName
    }
}

// remove
export const removeIngredient = ingName => {
    return {
        type: REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

// Set error state to true
export const setError = () => {
    return {
        type: SET_ERROR
    }
}

// Set error state to false
export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}

// set ingredients object in redux
export const setIngredients = ingredients => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    }
}

// get ingredients from firebase and call setIngredients on OK
export const initIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(err => {
                dispatch(setError())
            })
    }
}