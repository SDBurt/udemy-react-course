import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckoutSummary from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/checkout" component={CheckoutSummary} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>
    </Layout>
  );
}

export default App;
