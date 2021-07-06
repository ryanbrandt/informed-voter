/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApiResponse, PROBLEM_CODE } from "apisauce";
import {
  all,
  call,
  cancel,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import api from "../utils/api";

import * as t from "./actionTypes";
import {
  fecApiRequest,
  fecNonOkResponse,
  IFecApiRequest,
  IFecNonOkResponse,
} from "./actions";
import { DEFAULT_FEC_API_RESPONSE } from "./constants";
import { BaseFecResponse } from "./types";

export function* handleFecNonOkResponse(apiTask: any, action: any) {
  yield cancel(apiTask);
  console.log(action);
}

export function* handleFecApiRequest(action: IFecApiRequest) {
  const { path, onSuccess, requireResults, emitError } = action;

  try {
    const {
      ok,
      status,
      problem,
      data = DEFAULT_FEC_API_RESPONSE,
    }: ApiResponse<BaseFecResponse<unknown>> = yield call(api.get, path);

    const { results } = data;

    if (!ok || (requireResults && results?.length < 1)) {
      if (emitError) {
        yield put(fecNonOkResponse(status as number, problem as PROBLEM_CODE));
      }

      return;
    }

    const { parser } = action;
    let parsedData = data;

    if (parser) {
      parsedData = parser(results);
    }

    yield put(onSuccess(parsedData));
  } catch (e) {
    console.log(`Failed to complete FEC API call ${e}`);
  }
}

export function* watchFecApiRequest() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const fecApiTask = yield takeEvery(t.FEC_API_REQUEST, handleFecApiRequest);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  yield takeLatest(t.FEC_NON_OK_RESPONSE, handleFecNonOkResponse, fecApiTask);
}

export default function* rootSaga() {
  yield all([watchFecApiRequest()]);
}
