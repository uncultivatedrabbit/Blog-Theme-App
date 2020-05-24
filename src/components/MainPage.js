import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import HomePage from "./subcomponents/HomePage";
import ThemePage from "./subcomponents/ThemePage";
import FourOhFour from "./errors/FourOhFour";
import ErrorMessage from "./errors/ErrorMessage";

export default function MainPage() {
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
