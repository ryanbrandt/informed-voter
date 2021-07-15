/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";

import { getAndParse } from "../api/utils";
import { ElectioneeringTotals } from "./types";
import { fecElectioneeringTotalsResultsParser } from "./parsers";

export function* handleElectioneeringTotalsRequest(
  action: a.IElectioneeringTotalsRequest
) {
  const { candidateId } = action;

  try {
    const results: Array<ElectioneeringTotals> = yield call(() =>
      getAndParse(
        `/electioneering/totals/by_candidate/?candidate_id=${candidateId}`,
        fecElectioneeringTotalsResultsParser
      )
    );

    yield put(a.electioneeringTotalsSuccess(results));
  } catch (e) {
    console.log(`Failed to retrieve electioneering totals data ${e}`);
  }
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
