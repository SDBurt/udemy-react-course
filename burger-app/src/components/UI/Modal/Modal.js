import React from 'react'
import PropTypes from 'prop-types'

import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

const Modal = props => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.hide} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    )
}

// Check if props are equal, used in memo for performance optimization
const areEqual = (prevProps, nextProps) => {
    return prevProps.show === nextProps.show
}

Modal.propTypes = {
    show: PropTypes.bool,
    hide: PropTypes.func
}

export default React.memo(Modal, areEqual)
