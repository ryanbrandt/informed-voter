/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, put } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";

import { fecIndependetExpendituresTotalsResultsParser } from "./parsers";
import { fecApiRequest } from "../common/actions";

export function* handleIndependentExpendituresTotalsRequest(
  action: a.IIndependentExpendituresTotalsRequest
) {
  const { candidateId } = action;

  yield put(
    fecApiRequest(
      `/schedules/schedule_e/totals/by_candidate/?candidate_id=${candidateId}`,
      a.independentExpendituresTotalsSuccess,
      fecIndependetExpendituresTotalsResultsParser
    )
  );
}

export function* watchIndependentExpendituresTotalsRequest() {
  yield takeLatest(
    t.INDEPENDENT_EXPENDITURES_TOTALS_REQUEST,
    handleIndependentExpendituresTotalsRequest
  );
}

export function* handleIndependentExpendituresTotalsSuccess(
  action: a.IIndependentExpendituresTotalsSuccess
) {
  const { totals } = action;

  let latestCycle = -1;
  if (totals.length > 0) {
    latestCycle = Math.max(...totals.map((result) => result.cycle));
  }

  yield put(a.independetExpendituresTotalsSetActiveCycle(latestCycle));
}

export function* watchIndependentExpendituresTotalsSuccess() {
  yield takeLatest(
    t.INDEPENDENT_EXPENDITURES_TOTALS_SUCCESS,
    handleIndependentExpendituresTotalsSuccess
  );
}

export default function* rootSaga() {
  yield all([
    watchIndependentExpendituresTotalsRequest(),
    watchIndependentExpendituresTotalsSuccess(),
  ]);
}
