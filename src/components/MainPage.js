import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomePage from './HomePage';
import ProductPage from './ProductPage';

export default class MainPage extends Component {
  render() {
    return (
      <main id="main">
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/product-info/:id" component={ProductPage}/>
        </Switch>
        <Sidebar />
      </main>
    );
  }
}
