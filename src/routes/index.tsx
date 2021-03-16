import React from "react";
import { Switch, Route } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from "history";

import Landing from "../App/Subcomponents/Landing";
import CandidateSearch from "../CandidateSearch/Components/CandidateSearch";
import CandidateHub from "../CandidateHub/Components/CandidateHub";

export const history = createBrowserHistory();

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/candidate-search" component={CandidateSearch} />
    <Route exact path="/candidate-hub/:id" component={CandidateHub} />

    <Route exact path="*" component={CandidateSearch} />
  </Switch>
);
