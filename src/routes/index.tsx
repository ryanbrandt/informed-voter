import React from "react";
import { Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import CandidateSearch from "../CandidateSearch/Components/CandidateSearch";

export const history = createBrowserHistory();

export default (
  <Switch>
    <Route exact path="/candidate-search" component={CandidateSearch} />

    <Route path="*" component={CandidateSearch} />
  </Switch>
);
