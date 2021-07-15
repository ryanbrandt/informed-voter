/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, delay, put, select, call, all } from "redux-saga/effects";

import * as t from "./actionTypes";
import {
  getCurrentPage,
  getOffice,
  getPaginationUrl,
  getPartyAffiliation,
  getQuery,
} from "./selectors";

import api from "../api/api";
import { BaseFecResponse, Office, PoliticalParty } from "../common/types";
import {
  API_RESPONSE_DELAY,
  OFFICE_API_MAP,
  PARTY_API_MAP,
} from "../common/constants";
import {
  candidateSearchSuccess,
  setPagination,
  setSearchProcessing,
} from "./actions";
import { FecSearchResults, SearchPagination } from "./types";
import { fecSeachResultsParser } from "./parsers";

const SEARCH_BASE_URL = "/candidates/search/";

function* handleSearchResponse(
  data: BaseFecResponse<FecSearchResults>,
  url: string
) {
  const { results, pagination } = data;
  const { page, pages } = pagination;

  const paginationPayload: SearchPagination = {
    url,
    page,
    pages,
  };
  const parsedResults = fecSeachResultsParser(results);

  yield put(candidateSearchSuccess(parsedResults));
  yield put(setPagination(paginationPayload));
}

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

    if (ok) {
      yield call(handleSearchResponse, data, urlWithParams);
    }
  } catch (e) {
    console.log(e);
  }

  yield delay(API_RESPONSE_DELAY);
  yield put(setSearchProcessing(false));
}

export function* watchCandidateSearchRequest() {
  yield takeLatest(t.CANDIDATE_SEARCH_REQUEST, handleCandidateSearchRequest);
}

export function* handlePageRequest(page: number) {
  try {
    yield put(setSearchProcessing(true));
    const url: string = yield select(getPaginationUrl);

    let paginationUrl = `${url}?page=${page}`;
    if (url.includes("?")) {
      paginationUrl = `${url}&page=${page}`;
    }

    const {
      ok,
      data,
    }: { ok: boolean; data: BaseFecResponse<FecSearchResults> } = yield call(
      api.get,
      paginationUrl
    );

    if (ok) {
      yield call(handleSearchResponse, data, url);
    }
  } catch (e) {
    console.log(e);
  }

  yield delay(API_RESPONSE_DELAY);
  yield put(setSearchProcessing(false));
}

export function* handleNextPageRequest() {
  const page: number = yield select(getCurrentPage);

  yield call(handlePageRequest, page + 1);
}

export function* watchNextPageRequest() {
  yield takeLatest(t.NEXT_PAGE_REQUEST, handleNextPageRequest);
}

export function* handlePrevPageRequest() {
  const page: number = yield select(getCurrentPage);

  yield call(handlePageRequest, page - 1);
}

export function* watchPrevPageRequest() {
  yield takeLatest(t.PREV_PAGE_REQUEST, handlePrevPageRequest);
}

export default function* rootSaga() {
  yield all([
    watchCandidateSearchRequest(),
    watchNextPageRequest(),
    watchPrevPageRequest(),
  ]);
}
