import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css';

const Layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return (
        <React.Fragment>
            <Toolbar openSideDrawer={sideDrawerToggleHandler} isAuth={props.isAuthenticated} />
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuthenticated}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);