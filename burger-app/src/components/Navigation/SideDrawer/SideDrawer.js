import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../../UI/Logo/Logo'
import NaviationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

import classes from './SideDrawer.module.css'

const SideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <React.Fragment>
            <Backdrop showBackdrop={props.open} hideBackdrop={props.closed} />
            <div className={attachedClasses.join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav onClick={props.closed}>
                    <NaviationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>

    )
}

SideDrawer.propTypes = {
    open: PropTypes.bool,
    closed: PropTypes.func,
    isAuth: PropTypes.bool
}

export default SideDrawer
