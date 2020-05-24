import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomePage from "./HomePage";
import ThemePage from "./ThemePage";
import FourOhFour from "./errors/FourOhFour";
import ErrorMessage from "./errors/ErrorMessage";

export default class MainPage extends Component {
  render() {
    return (
      <ErrorMessage>
        <main id="main">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/theme/:id"
              render={(props) => <ThemePage {...props} />}
            />
            <Route component={FourOhFour} />
          </Switch>
          <Switch>
            <Route exact path="/" component={Sidebar} />
          </Switch>
        </main>
      </ErrorMessage>
    );
  }
}
