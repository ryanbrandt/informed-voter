/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import * as t from "./actionTypes";
import * as a from "./actions";

import api from "../utils/api";
import { fecCommunicationCostsResultsParser } from "./parsers";
import { FecCommunicationCostsResults } from "./types";
import { DEFAULT_FEC_API_RESPONSE } from "../common/constants";
import { BaseFecResponse } from "../common/types";

export function* handleCommunicationCostsRequest(
  action: a.ICommunicationCostsRequest
) {
  const { candidateId } = action;

  try {
    const {
      ok,
      status,
      problem,
      data = DEFAULT_FEC_API_RESPONSE,
    }: ApiResponse<BaseFecResponse<FecCommunicationCostsResults>> = yield call(
      api.get,
      `/communication_costs/totals/by_candidate/?candidate_id=${candidateId}`
    );

    if (!ok) {
      throw Error(`Non-OK response: ${status} - ${problem}`);
    }

    const { results } = data;
    const parsedResults = fecCommunicationCostsResultsParser(results);

    let latestCycle = -1;
    if (parsedResults.length > 0) {
      latestCycle = Math.max(...parsedResults.map((result) => result.cycle));
    }

    yield put(a.communicationCostsSetActiveCycle(latestCycle));
    yield put(a.communicationCostsSuccess(parsedResults));
  } catch (e) {
    console.log(`Failed to retrieve communication costs data ${e}`);
  }
}

export function* watchCommunicationCostsRequest() {
  yield takeLatest(
    t.COMMUNICATION_COSTS_REQUEST,
    handleCommunicationCostsRequest
  );
}

export default function* rootSaga() {
  yield all([watchCommunicationCostsRequest()]);
}
