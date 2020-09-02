import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../UI/Button/Button'

const OrderSummary = props => {

    // <li>Salad: 1</li>

    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {key}
                    </span>: {props.ingredients[key]}
                </li>
            )
        })

    return (
        <React.Fragment>

            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Your order total: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </React.Fragment>
    )
}

OrderSummary.propTypes = {
    ingredients: PropTypes.object.isRequired,
    purchaseCancelled: PropTypes.func,
    purchaseContinue: PropTypes.func,
    price: PropTypes.number
}

export default OrderSummary
