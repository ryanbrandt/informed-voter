import { takeLatest, delay, put, select, call, all } from "redux-saga/effects";

import * as t from "./actionTypes";
import { getOffice, getPartyAffiliation, getQuery } from "./selectors";

import api from "../utils/api";
import { BaseFecResponse, Office, PoliticalParty } from "../common/types";
import { OFFICE_API_MAP, PARTY_API_MAP } from "../common/constants";
import { candidateSearchSuccess, setSearchProcessing } from "./actions";
import { FecSearchResults } from "./types";
import { fecSeachResultsParser } from "./parsers";

const SEARCH_BASE_URL = "/candidates/search/";

function* buildSearchUrl() {
  const query: string | null = yield select(getQuery);
  const office: Office | null = yield select(getOffice);
  const party: PoliticalParty | null = yield select(getPartyAffiliation);

  const params = [];
  if (query) {
    params.push(`q=${query}`);
  }

  if (office) {
    params.push(`office=${OFFICE_API_MAP[office]}`);
  }

  if (party) {
    params.push(`party=${PARTY_API_MAP[party]}`);
  }

  let queryParams = "";
  if (params.length > 0) {
    queryParams = `?${params.join("&")}`;
  }

  return `${SEARCH_BASE_URL}${queryParams}`;
}

export function* handleCandidateSearchRequest() {
  try {
    yield put(setSearchProcessing(true));

    const urlWithParams: string = yield call(buildSearchUrl);
    const {
      ok,
      data,
    }: { ok: boolean; data: BaseFecResponse<FecSearchResults> } = yield call(
      api.get,
      urlWithParams
    );

    // need more error handling
    if (ok) {
      const { results } = data;
      const parsedResults = fecSeachResultsParser(results);

      yield put(candidateSearchSuccess(parsedResults));
    }
  } catch (e) {
    console.log(e);
  }

  yield delay(1000);
  yield put(setSearchProcessing(false));
}

export function* watchCandidateSearchRequest() {
  yield takeLatest(t.CANDIDATE_SEARCH_REQUEST, handleCandidateSearchRequest);
}

export default function* rootSaga() {
  yield all([watchCandidateSearchRequest()]);
}
