/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all } from "redux-saga/effects";

import searchSaga from "../CandidateSearch/sagas";
import candidateHubSaga from "../CandidateHub/sagas";

export default function* () {
  yield all([searchSaga(), candidateHubSaga()]);
}
