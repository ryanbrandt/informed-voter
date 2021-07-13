/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApiResponse, PROBLEM_CODE } from "apisauce";
import {
  all,
  call,
  cancel,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import api from "../utils/api";

import * as t from "./actionTypes";
import { fecApiError, IFecApiError, IFecApiRequest } from "./actions";
import { DEFAULT_FEC_API_RESPONSE } from "./constants";
import { BaseFecResponse } from "./types";
import { history } from "../routes";

export function* handleFecNonOkResponse(apiTask: any, action: IFecApiError) {
  yield cancel(apiTask);

  const { status } = action;
  history.push("/error", { variant: status });
}

export function* handleFecApiRequest(action: IFecApiRequest<unknown, unknown>) {
  const { path, onSuccess, requireResults, emitError } = action;

  let problemError: PROBLEM_CODE | undefined;
  let problemStatus: number | undefined;

  try {
    const {
      ok,
      status,
      problem,
      data = DEFAULT_FEC_API_RESPONSE,
    }: ApiResponse<BaseFecResponse<unknown>> = yield call(api.get, path);

    const { results } = data;

    if (!ok) {
      problemError = problem as PROBLEM_CODE;
      problemStatus = status as number;
    } else if (requireResults && results.length < 1) {
      problemError = "CLIENT_ERROR";
      problemStatus = 404;
    } else {
      const { parser } = action;
      const parsedData = parser(results);

      yield put(onSuccess(parsedData));
    }
  } catch (e) {
    console.log(`Failed to complete FEC API call ${e}`);

    problemError = "UNKNOWN_ERROR";
    problemStatus = -1;
  }

  if (emitError && problemError !== undefined && problemStatus !== undefined) {
    yield put(fecApiError(problemStatus, problemError));
  }
}

export function* watchFecApiRequest() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fecApiTask = yield takeEvery(t.FEC_API_REQUEST, handleFecApiRequest);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(t.FEC_API_ERROR, handleFecNonOkResponse, fecApiTask);
}

export default function* rootSaga() {
  yield all([watchFecApiRequest()]);
}
