import React from "react";

//Import d'elements de react router dom
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

//Pages
import About from "./pages/About";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductsDetails from "./pages/ProductDetails";

//Components
import Header from './components/Header';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
  <Router>
    <Header />
    <Alert />
    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/cart">
      <Cart />
    </Route>
    <PrivateRoute path="/checkout">
      <Checkout />
    </PrivateRoute>
    <Route path="/login">
      <Login />
    </Route>
    <Route exact path="/products">
      <Products />
    </Route>
    <Route path="/products/:id" children={<ProductsDetails />}>
    </Route>
    <Route path="*">
      <Error />
    </Route>
    </Switch>
  </Router>);
}