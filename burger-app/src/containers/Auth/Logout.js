import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { authLogout } from '../../redux/actions/auth'

const Logout = props => {

    const { onLogout } = props;

    useEffect(() => {
        onLogout()
    }, [onLogout]);

    return <Redirect to="/" />


}

const mapActionToProp = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapActionToProp)(Logout)