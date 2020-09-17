import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";


import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckoutSummary from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';

import { authCheckState } from './redux/actions/auth'

const App = (props) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authCheckState())
  }, []);


  let routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>

  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={CheckoutSummary} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}



export default connect(mapStateToProps)(App);
