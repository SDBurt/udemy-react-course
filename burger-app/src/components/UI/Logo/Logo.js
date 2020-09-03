import React from 'react'

import burgerlogo from '../../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

export const Logo = (props) => {
    return (
        <div className={classes.Logo} style={{ height: props.height }}>
            <img src={burgerlogo} alt='burger logo' />
        </div>
    )
}

export default Logo;