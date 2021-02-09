import { FecSearchResults, SearchResults } from "./types";

export const fecSeachResultsParser = (
  results: FecSearchResults[]
): SearchResults[] => {
  return results.map((result) => ({
    id: result.candidate_id,
    name: result.name,
    office: result.office_full,
    party: result.party_full,
    state: result.state,
    district: result.district,
  }));
};
