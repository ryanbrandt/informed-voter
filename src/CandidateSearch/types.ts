import { PoliticalParty, Office } from "../common/types";

export interface SearchPagination {
  page: number;
  pages: number;
  url: string;
}

export interface CandidateSearchParams {
  party?: PoliticalParty;
  office?: Office;
}

export interface FecSearchResults {
  candidate_id: string;
  office_full: string;
  party_full: string;
  name: string;
  state: string;
  district: string;
}

export interface SearchResults {
  id: string;
  office: string;
  party: string;
  name: string;
  state: string;
  district: string;
}
