import React from 'react'
import PropTypes from 'prop-types'

import classes from './Backdrop.module.css'

const Backdrop = props => {
    return (
        props.showBackdrop ? <div className={classes.Backdrop} onClick={props.hideBackdrop}></div> : null
    )
}

Backdrop.propTypes = {
    showBackdrop: PropTypes.bool,
    hideBackdrop: PropTypes.func
}

export default Backdrop
