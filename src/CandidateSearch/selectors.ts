import { Office, PoliticalParty } from "../common/types";
import { RootState } from "../store/rootReducer";
import { SearchResults } from "./types";

export const getQuery = (state: RootState): string | null => state.search.query;
export const getPartyAffiliation = (state: RootState): PoliticalParty | null =>
  state.search.party;
export const getOffice = (state: RootState): Office | null =>
  state.search.office;

export const getSearchProcessing = (state: RootState): boolean =>
  state.search.processing;

export const getCandidates = (state: RootState): SearchResults[] =>
  state.search.candidates;
