import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

// Create a checkout summary
const Checkout = (props) => {

    const orderContinueHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    const orderCancelHandler = () => {
        props.history.goBack()
    }


    let summary = <Redirect to="/" />

    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancelled={orderCancelHandler}
                    checkoutContinued={orderContinueHandler}
                />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }

    return summary;


}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);