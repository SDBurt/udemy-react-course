import React from 'react'

import classes from './BuildControls.module.css'

import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {

    const buildControls = controls.map((control) => {
        return (
            <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]}
            />)
    });

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {buildControls}
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                onClick={props.order}
            >ORDER NOW</button>
        </div>
    )
}

export default BuildControls
