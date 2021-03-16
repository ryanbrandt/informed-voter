/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all } from "redux-saga/effects";

import searchSaga from "../CandidateSearch/sagas";
import candidateHubSaga from "../CandidateHub/sagas";
import electioneeringSaga from "../Electioneering/sagas";
import independentExpendituresSaga from "../IndepdentExpenditures/sagas";
import communicationCostsSaga from "../CommunicationCosts/sagas";

export default function* () {
  yield all([
    searchSaga(),
    candidateHubSaga(),
    electioneeringSaga(),
    independentExpendituresSaga(),
    communicationCostsSaga(),
  ]);
}
