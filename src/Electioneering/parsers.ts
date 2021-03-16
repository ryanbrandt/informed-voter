import { IFecParser } from "../utils/types";
import { FecElectioneeringTotalsResults, ElectioneeringTotals } from "./types";

export const fecElectioneeringTotalsResultsParser: IFecParser<
  FecElectioneeringTotalsResults,
  Array<ElectioneeringTotals>
> = (
  totals: Array<FecElectioneeringTotalsResults>
): Array<ElectioneeringTotals> => {
  return totals.map((result) => {
    return {
      total: result.total,
      cycle: result.cycle,
      candidateId: result.candidate_id,
    };
  });
};
