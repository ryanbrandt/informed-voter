/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";

import { getAndParse } from "../utils/helpers";
import { fecCommunicationCostsResultsParser } from "./parsers";
import { CommunicationCosts } from "./types";

export function* handleCommunicationCostsRequest(
  action: a.ICommunicationCostsRequest
) {
  const { candidateId } = action;

  try {
    const results: Array<CommunicationCosts> = yield call(() =>
      getAndParse(
        `/communication_costs/totals/by_candidate/?candidate_id=${candidateId}`,
        fecCommunicationCostsResultsParser
      )
    );

    let latestCycle = -1;
    if (results.length > 0) {
      latestCycle = Math.max(...results.map((result) => result.cycle));
    }

    yield put(a.communicationCostsSetActiveCycle(latestCycle));
    yield put(a.communicationCostsSuccess(results));
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
