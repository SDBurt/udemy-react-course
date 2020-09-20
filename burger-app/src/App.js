import React, { useEffect, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";


import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout';

import { authCheckState } from './redux/actions/auth'
import asyncComponent from './hoc/asyncComponents/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

const App = (props) => {

  const dispatch = useDispatch()
  const stableDispatch = useCallback(dispatch, [])


  useEffect(() => {
    stableDispatch(authCheckState())
  }, [stableDispatch]);


  let routes = (
    <Switch>
      <Route path="/auth" exact component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>

  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/auth" exact component={asyncAuth} />
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
