import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

// Create a checkout summary
class Checkout extends Component {

    orderContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    orderCancelHandler = () => {
        this.props.history.goBack()
    }

    render() {

        let summary = <Redirect to="/" />

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.orderCancelHandler}
                        checkoutContinued={this.orderContinueHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            )
        }

        return summary;

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);