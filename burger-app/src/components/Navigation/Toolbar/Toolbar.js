import React from 'react'
import PropTypes from 'prop-types'
import classes from './Toolbar.module.css'

import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.openSideDrawer} />
            <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
                <Logo />
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    )
}

Toolbar.propTypes = {
    openSideDrawer: PropTypes.func,
    isAuth: PropTypes.bool
}

export default Toolbar
