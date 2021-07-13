/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, put } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";
import { fecApiRequest } from "../common/actions";

import { fecElectioneeringTotalsResultsParser } from "./parsers";

export function* handleElectioneeringTotalsRequest(
  action: a.IElectioneeringTotalsRequest
) {
  const { candidateId } = action;

  yield put(
    fecApiRequest(
      `/electioneering/totals/by_candidate/?candidate_id=${candidateId}`,
      a.electioneeringTotalsSuccess,
      fecElectioneeringTotalsResultsParser
    )
  );
}

export function* watchElectioneeringTotalsRequest() {
  yield takeLatest(
    t.ELECTIONEERING_TOTALS_REQUEST,
    handleElectioneeringTotalsRequest
  );
}

export default function* rootSaga() {
  yield all([watchElectioneeringTotalsRequest()]);
}
