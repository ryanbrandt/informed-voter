import { Office, PoliticalParty } from "../common/types";
import * as t from "./actionTypes";
import { SearchResults } from "./types";

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
  | ISetSearchProcessing;
