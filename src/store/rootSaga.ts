import { all } from "redux-saga/effects";

import searchSaga from "../CandidateSearch/sagas";

export default function* () {
  yield all([searchSaga()]);
}
