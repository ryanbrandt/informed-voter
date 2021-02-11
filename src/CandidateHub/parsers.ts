import { CandidateInfo, FecCandidateInfoResults } from "./types";

export const fecCandidateInfoResultsParser = (
  results: FecCandidateInfoResults
): CandidateInfo => ({
  name: results.name,
  party: results.party_full,
  office: results.office_full,
  city: results.address_city,
  state: results.state,
  cycles: results.cycles,
  districts: results.election_districts,
  raisedFunds: results.has_raised_funds,
});
