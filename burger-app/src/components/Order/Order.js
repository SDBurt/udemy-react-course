import React from 'react'

import classes from './Order.module.css';

export const Order = (props) => {

    /* Alternative method
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey + i} type={ingKey} />;
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    */

    const ingredients = [];

    for (let ingredient in props.ingredients) {
        ingredients.push(
            {
                name: ingredient,
                amount: props.ingredients[ingredient]
            }
        )
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
            >
                {ig.name} ({ig.amount})
            </span>

        )
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
