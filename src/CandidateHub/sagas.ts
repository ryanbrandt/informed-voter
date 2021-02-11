/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, put, select, call, delay } from "redux-saga/effects";

import * as t from "./actionTypes";
import api from "../utils/api";
import {
  activeCandidateInfoSuccess,
  setCandidateHubProcessing,
} from "./actions";
import { getActiveCandidateId } from "./selectors";
import { BaseFecResponse } from "../common/types";
import { FecCandidateInfoResults } from "./types";
import { fecCandidateInfoResultsParser } from "./parsers";

export function* handleActiveCandidateInfoRequest() {
  yield put(setCandidateHubProcessing(true));

  const candidateId: string | null = yield select(getActiveCandidateId);

  try {
    const {
      ok,
      status,
      problem,
      data,
    }: {
      ok: boolean;
      status: number;
      problem: string;
      data: BaseFecResponse<FecCandidateInfoResults>;
    } = yield call(api.get, `/candidate/${candidateId}`);

    if (!ok) {
      throw Error(`Non-OK response: ${status} - ${problem}`);
    }

    const { results } = data;
    const [candidateInfo] = results;

    const parsedResults = fecCandidateInfoResultsParser(candidateInfo);
    yield put(activeCandidateInfoSuccess(parsedResults));
  } catch (e) {
    console.log(`Failed to retrieve candidate info ${e}`);
  }

  yield delay(500);
  yield put(setCandidateHubProcessing(false));
}

export function* watchActiveCandidateInfoRequest() {
  yield takeLatest(
    t.ACTIVE_CANDIDATE_INFO_REQUEST,
    handleActiveCandidateInfoRequest
  );
}

export default function* rootSaga() {
  yield all([watchActiveCandidateInfoRequest()]);
}
