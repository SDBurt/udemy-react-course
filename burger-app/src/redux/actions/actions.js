import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../redux/types';

// Add
export const addIngredient = ingName => dispatch => {
    dispatch({ type: ADD_INGREDIENT, ingredientName: ingName })
}

// remove
export const removeIngredient = ingName => dispatch => {
    dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName })
}