import { IFecParser } from "../utils/types";
import { CandidateInfo, FecCandidateInfoResults } from "./types";

export const fecCandidateInfoResultsParser: IFecParser<
  FecCandidateInfoResults,
  CandidateInfo
> = (results: Array<FecCandidateInfoResults>): CandidateInfo => {
  const [result] = results;

  return {
    name: result.name,
    party: result.party_full,
    office: result.office_full,
    city: result.address_city,
    state: result.state,
    cycles: result.cycles,
    districts: result.election_districts,
    raisedFunds: result.has_raised_funds,
  };
};
