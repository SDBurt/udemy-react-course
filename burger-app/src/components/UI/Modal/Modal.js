import React from 'react'
import PropTypes from 'prop-types'

import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.css'

const Modal = props => {
    return (
        <React.Fragment>
            <Backdrop showBackdrop={props.showModal} hideBackdrop={props.hideModal} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.showModal ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    )
}

// Check if props are equal, used in memo for performance optimization
const areEqual = (prevProps, nextProps) => {
    return (
        prevProps.showModal === nextProps.showModal
        && prevProps.children === nextProps.children
    );
}

Modal.propTypes = {
    showModal: PropTypes.bool,
    hideModal: PropTypes.func
}

export default React.memo(Modal, areEqual)
