import React from 'react'
import PropTypes from 'prop-types'

import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.module.css'

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
}

NavigationItems.propTypes = {

}

export default NavigationItems
