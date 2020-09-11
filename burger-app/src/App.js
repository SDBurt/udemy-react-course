import React from 'react';
import { Route, Switch } from 'react-router-dom'

import { BrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux";
import store from "./redux/store"

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import CheckoutSummary from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/checkout" component={CheckoutSummary} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
