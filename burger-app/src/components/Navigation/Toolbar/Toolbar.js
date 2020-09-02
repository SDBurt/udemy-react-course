import React from 'react'
import PropTypes from 'prop-types'
import classes from './Toolbar.module.css'

import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'


const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}

Toolbar.propTypes = {

}

export default Toolbar
