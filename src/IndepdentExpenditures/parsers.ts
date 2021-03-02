import {
  FecIndependentExpendituresTotalsResults,
  IndependentExpendituresTotals,
} from "./types";

export function fecIndependetExpendituresTotalsResultsParser(
  totals: Array<FecIndependentExpendituresTotalsResults>
): Array<IndependentExpendituresTotals> {
  return totals
    .filter((result) => result.cycle)
    .map((result) => {
      let oppose = false;
      if (result.support_oppose_indicator === "O") {
        oppose = true;
      }

      return {
        oppose,
        candidateId: result.candidate_id,
        cycle: result.cycle,
        total: result.total,
      };
    });
}
