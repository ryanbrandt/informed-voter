import { Office, PoliticalParty } from "../common/types";
import * as t from "./actionTypes";
import { SearchPagination, SearchResults } from "./types";

export interface ISetQuery {
  type: t.T_SET_QUERY;
  query: string | null;
}

export function setQuery(query: string | null): ISetQuery {
  return {
    type: t.SET_QUERY,
    query,
  };
}

export interface ISetPartyAffiliation {
  type: t.T_SET_PARTY_AFFILIATION;
  party: PoliticalParty | "" | null;
}

export function setPartyAffiliation(
  party: PoliticalParty | "" | null
): ISetPartyAffiliation {
  return {
    type: t.SET_PARTY_AFFILIATION,
    party,
  };
}

export interface ISetOffice {
  type: t.T_SET_OFFICE;
  office: Office | "" | null;
}

export function setOffice(office: Office | "" | null): ISetOffice {
  return {
    type: t.SET_OFFICE,
    office,
  };
}

export interface ICandidateSearchRequest {
  type: t.T_CANDIDATE_SEARCH_REQUEST;
}

export function candidateSearchRequest(): ICandidateSearchRequest {
  return {
    type: t.CANDIDATE_SEARCH_REQUEST,
  };
}

export interface ICandidateSearchSuccess {
  type: t.T_CANDIDATE_SEARCH_SUCCESS;
  candidates: SearchResults[];
}

export function candidateSearchSuccess(
  candidates: SearchResults[]
): ICandidateSearchSuccess {
  return {
    type: t.CANDIDATE_SEARCH_SUCCESS,
    candidates,
  };
}

export interface ISetPagination {
  type: t.T_SET_PAGINATION;
  pagination: SearchPagination;
}

export function setPagination(pagination: SearchPagination): ISetPagination {
  return {
    type: t.SET_PAGINATION,
    pagination,
  };
}

export interface INextPageRequest {
  type: t.T_NEXT_PAGE_REQUEST;
}

export function nextPageRequest(): INextPageRequest {
  return {
    type: t.NEXT_PAGE_REQUEST,
  };
}

export interface IPrevPageRequest {
  type: t.T_PREV_PAGE_REQUEST;
}

export function prevPageRequest(): IPrevPageRequest {
  return {
    type: t.PREV_PAGE_REQUEST,
  };
}

export interface ISetSearchProcessing {
  type: t.T_SET_SEARCH_PROCESSING;
  processing: boolean;
}

export function setSearchProcessing(processing: boolean): ISetSearchProcessing {
  return {
    type: t.SET_SEARCH_PROCESSING,
    processing,
  };
}

export type SearchAction =
  | ISetOffice
  | ISetPartyAffiliation
  | ISetQuery
  | ICandidateSearchSuccess
  | ISetPagination
  | ISetSearchProcessing;
