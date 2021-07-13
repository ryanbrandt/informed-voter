/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, put } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";
import { fecApiRequest } from "../common/actions";

import { fecCommunicationCostsResultsParser } from "./parsers";

export function* handleCommunicationCostsRequest(
  action: a.ICommunicationCostsRequest
) {
  const { candidateId } = action;

  yield put(
    fecApiRequest(
      `/communication_costs/totals/by_candidate/?candidate_id=${candidateId}`,
      a.communicationCostsSuccess,
      fecCommunicationCostsResultsParser
    )
  );
}

export function* watchCommunicationCostsRequest() {
  yield takeLatest(
    t.COMMUNICATION_COSTS_REQUEST,
    handleCommunicationCostsRequest
  );
}

export function* handleCommunicationCostsSuccess(
  action: a.ICommunicationCostsSuccess
) {
  const { costs } = action;

  let latestCycle = -1;
  if (costs.length > 0) {
    latestCycle = Math.max(...costs.map((result) => result.cycle));
  }

  yield put(a.communicationCostsSetActiveCycle(latestCycle));
}

export function* watchCommunicationCostsSuccess() {
  yield takeLatest(
    t.COMMUNICATION_COSTS_SUCCESS,
    handleCommunicationCostsSuccess
  );
}

export default function* rootSaga() {
  yield all([
    watchCommunicationCostsRequest(),
    watchCommunicationCostsSuccess(),
  ]);
}
