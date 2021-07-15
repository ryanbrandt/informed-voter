/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";

import { getAndParse } from "../api/utils";
import { fecIndependetExpendituresTotalsResultsParser } from "./parsers";
import { IndependentExpendituresTotals } from "./types";

export function* handleIndependentExpendituresTotalsRequest(
  action: a.IIndependentExpendituresTotalsRequest
) {
  const { candidateId } = action;

  try {
    const results: Array<IndependentExpendituresTotals> = yield call(() =>
      getAndParse(
        `/schedules/schedule_e/totals/by_candidate/?candidate_id=${candidateId}`,
        fecIndependetExpendituresTotalsResultsParser
      )
    );

    let latestCycle = -1;
    if (results.length > 0) {
      latestCycle = Math.max(...results.map((result) => result.cycle));
    }

    yield put(a.independetExpendituresTotalsSetActiveCycle(latestCycle));
    yield put(a.independentExpendituresTotalsSuccess(results));
  } catch (e) {
    console.log(`Failed to retrieve independent expenditures totals data ${e}`);
  }
}

export function* watchIndependentExpendituresTotalsRequest() {
  yield takeLatest(
    t.INDEPENDENT_EXPENDITURES_TOTALS_REQUEST,
    handleIndependentExpendituresTotalsRequest
  );
}

export default function* rootSaga() {
  yield all([watchIndependentExpendituresTotalsRequest()]);
}
