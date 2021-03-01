/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import * as t from "./actionTypes";
import * as a from "./actions";

import api from "../utils/api";

import { DEFAULT_FEC_API_RESPONSE } from "../common/constants";
import { BaseFecResponse } from "../common/types";
import { fecIndependetExpendituresTotalsResultsParser } from "./parsers";
import { FecIndependentExpendituresTotalsResults } from "./types";

export function* handleIndependentExpendituresTotalsRequest(
  action: a.IIndependentExpendituresTotalsRequest
) {
  const { candidateId } = action;

  try {
    const {
      ok,
      status,
      problem,
      data = DEFAULT_FEC_API_RESPONSE,
    }: ApiResponse<
      BaseFecResponse<FecIndependentExpendituresTotalsResults>
    > = yield call(
      api.get,
      `/schedules/schedule_e/totals/by_candidate/?candidate_id=${candidateId}`
    );

    if (!ok) {
      throw Error(`Non-OK response: ${status} - ${problem}`);
    }

    const { results } = data;
    const parsedResults = fecIndependetExpendituresTotalsResultsParser(results);
    const earliestCycle = Math.min(
      ...parsedResults.map((result) => result.cycle)
    );

    yield put(a.independetExpendituresTotalsSetActiveCycle(earliestCycle));
    yield put(a.independentExpendituresTotalsSuccess(parsedResults));
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
