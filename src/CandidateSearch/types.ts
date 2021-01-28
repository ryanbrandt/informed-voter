import { PoliticalParty, Office } from "../common/types";

export interface CandidateSearchParams {
  party?: PoliticalParty;
  office?: Office;
}
