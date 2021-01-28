import { Office, PoliticalParty } from "../common/types";
import * as t from "./actionTypes";

export interface ISetQuery {
  type: t.T_SET_QUERY;
  query: string;
}

export function setQuery(query: string): ISetQuery {
  return {
    type: t.SET_QUERY,
    query,
  };
}

export interface ISetPartyAffiliation {
  type: t.T_SET_PARTY_AFFILIATION;
  party: PoliticalParty;
}

export function setPartyAffiliation(
  party: PoliticalParty
): ISetPartyAffiliation {
  return {
    type: t.SET_PARTY_AFFILIATION,
    party,
  };
}

export interface ISetOffice {
  type: t.T_SET_OFFICE;
  office: Office;
}

export function setOffice(office: Office): ISetOffice {
  return {
    type: t.SET_OFFICE,
    office,
  };
}

export type SearchAction = ISetOffice | ISetPartyAffiliation | ISetQuery;
