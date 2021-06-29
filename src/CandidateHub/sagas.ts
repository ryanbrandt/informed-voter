/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  all,
  takeLatest,
  take,
  put,
  call,
  delay,
  race,
} from "redux-saga/effects";

import * as t from "./actionTypes";
import * as a from "./actions";

import { getAndParse } from "../utils/helpers";
import { CandidateInfo } from "./types";
import { ONE_SECOND_MS } from "../common/constants";
import { fecCandidateInfoResultsParser } from "./parsers";
import { electioneeringTotalsRequest } from "../Electioneering/actions";
import { independentExpendituresTotalsRequest } from "../IndepdentExpenditures/actions";
import { communicationCostsRequest } from "../CommunicationCosts/actions";
import { fecNonOkResponse } from "../common/actions";
import { ELECTIONEERING_TOTALS_SUCCESS } from "../Electioneering/actionTypes";
import { INDEPENDENT_EXPENDITURES_TOTALS_SUCCESS } from "../IndepdentExpenditures/actionTypes";
import { COMMUNICATION_COSTS_SUCCESS } from "../CommunicationCosts/actionTypes";
import { FEC_NON_OK_RESPONSE } from "../common/actionTypes";

import { history } from "../routes";

export function* handleSetActiveCandidate(action: a.ISetActiveCandidate) {
  const { id } = action;

  yield put(a.activeCandidateInfoRequest(id));
  yield put(electioneeringTotalsRequest(id));
  yield put(independentExpendituresTotalsRequest(id));
  yield put(communicationCostsRequest(id));

  const { success, failure, timeout } = yield race({
    success: take([
      t.ACTIVE_CANDIDATE_INFO_SUCCESS,
      ELECTIONEERING_TOTALS_SUCCESS,
      INDEPENDENT_EXPENDITURES_TOTALS_SUCCESS,
      COMMUNICATION_COSTS_SUCCESS,
    ]),
    failure: take(FEC_NON_OK_RESPONSE),
    timeout: delay(ONE_SECOND_MS * 10),
  });

  yield put(a.setCandidateHubProcessing(false));
  if (failure || timeout) {
    history.push("/error");
  }
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
    yield put(fecNonOkResponse());
    console.log(`Failed to retrieve candidate info ${e}`);
  }
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
