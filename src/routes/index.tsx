import React from "react";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Landing from "../App/Subcomponents/Landing";

export const history = createBrowserHistory();

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/candidate-search" component={Landing} />
    <Route exact path="/candidate/:id" component={Landing} />

    <Route path="*" component={Landing} />
  </Switch>
);
