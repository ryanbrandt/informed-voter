/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import * as t from "./actionTypes";
import * as a from "./actions";

import api from "../utils/api";
import { FecElectioneeringTotalsResults } from "./types";
import { DEFAULT_FEC_API_RESPONSE } from "../common/constants";
import { BaseFecResponse } from "../common/types";
import { fecElectioneeringTotalsResultsParser } from "./parsers";

export function* handleElectioneeringTotalsRequest(
  action: a.IElectioneeringTotalsRequest
) {
  const { candidateId } = action;

  try {
    const {
      ok,
      status,
      problem,
      data = DEFAULT_FEC_API_RESPONSE,
    }: ApiResponse<
      BaseFecResponse<FecElectioneeringTotalsResults>
    > = yield call(
      api.get,
      `/electioneering/totals/by_candidate/?candidate_id=${candidateId}`
    );

    if (!ok) {
      throw Error(`Non-OK response: ${status} - ${problem}`);
    }

    const { results } = data;
    const parsedResults = fecElectioneeringTotalsResultsParser(results);

    yield put(a.electioneeringTotalsSuccess(parsedResults));
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
