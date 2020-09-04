import React from 'react'
import classes from './Spinner.module.css'

const Spinner = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.LdsSpinner} style={{ textAlign: 'center' }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Spinner
