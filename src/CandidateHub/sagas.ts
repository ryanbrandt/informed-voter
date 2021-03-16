/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all, takeLatest, put, call, delay } from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";

import { getAndParse } from "../utils/helpers";
import { CandidateInfo } from "./types";
import { fecCandidateInfoResultsParser } from "./parsers";
import { electioneeringTotalsRequest } from "../Electioneering/actions";
import { independentExpendituresTotalsRequest } from "../IndepdentExpenditures/actions";
import { communicationCostsRequest } from "../CommunicationCosts/actions";

export function* handleSetActiveCandidate(action: a.ISetActiveCandidate) {
  const { id } = action;

  yield put(a.activeCandidateInfoRequest(id));
  yield put(electioneeringTotalsRequest(id));
  yield put(independentExpendituresTotalsRequest(id));
  yield put(communicationCostsRequest(id));
}

export function* watchSetActiveCandidate() {
  yield takeLatest(t.SET_ACTIVE_CANDIDATE, handleSetActiveCandidate);
}

export function* handleActiveCandidateInfoRequest(
  action: a.IActiveCandidateInfoRequest
) {
  yield put(a.setCandidateHubProcessing(true));

  const { candidateId } = action;

  try {
    const results: CandidateInfo = yield call(() =>
      getAndParse(`/candidate/${candidateId}`, fecCandidateInfoResultsParser)
    );

    yield put(a.activeCandidateInfoSuccess(results));
  } catch (e) {
    console.log(`Failed to retrieve candidate info ${e}`);
  }

  yield delay(500);
  yield put(a.setCandidateHubProcessing(false));
}

export function* watchActiveCandidateInfoRequest() {
  yield takeLatest(
    t.ACTIVE_CANDIDATE_INFO_REQUEST,
    handleActiveCandidateInfoRequest
  );
}

export default function* rootSaga() {
  yield all([watchSetActiveCandidate(), watchActiveCandidateInfoRequest()]);
}
