import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { authLogout } from '../../redux/actions/auth'

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapActionToProp = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapActionToProp)(Logout)