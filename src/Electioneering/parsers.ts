import { FecElectioneeringTotalsResults, ElectioneeringTotals } from "./types";

export function fecElectioneeringTotalsResultsParser(
  totals: Array<FecElectioneeringTotalsResults>
): Array<ElectioneeringTotals> {
  return totals.map((result) => {
    return {
      total: result.total,
      cycle: result.cycle,
      candidateId: result.candidate_id,
    };
  });
}
