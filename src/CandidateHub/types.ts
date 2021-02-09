import { PoliticalParty } from "../common/types";

export interface FecCandidateInfoResults {
  name: string;
  state: string;
  address_city: string;
  party_full: PoliticalParty;
  cycles: Array<number>;
  election_districts: Array<string>;
  has_raised_funds: boolean;
}

export interface CandidateInfo {
  name: string;
  state: string;
  city: string;
  party: PoliticalParty;
  cycles: Array<number>;
  districts: Array<string>;
  raisedFunds: boolean;
}
