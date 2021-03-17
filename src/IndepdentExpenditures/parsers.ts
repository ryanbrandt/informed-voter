import { IFecParser } from "../utils/types";
import { findUnmergedCycleData } from "../utils/helpers";
import {
  FecIndependentExpendituresTotalsResults,
  IndependentExpendituresTotals,
} from "./types";

export const fecIndependetExpendituresTotalsResultsParser: IFecParser<
  FecIndependentExpendituresTotalsResults,
  Array<IndependentExpendituresTotals>
> = (
  totals: Array<FecIndependentExpendituresTotalsResults>
): Array<IndependentExpendituresTotals> => {
  const mapped = totals
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

  const merged: Array<IndependentExpendituresTotals> = [];
  mapped.forEach((result) => {
    const unmergedMatchIndex = findUnmergedCycleData(
      mapped,
      result,
      ["oppose"],
      ["total"]
    );

    if (unmergedMatchIndex > -1) {
      const existingUmergedItem = mapped[unmergedMatchIndex];

      const { total: currentItemTotal } = result;
      const { total: existingItemTotal } = existingUmergedItem;

      merged[unmergedMatchIndex] = {
        ...existingUmergedItem,
        total: currentItemTotal + existingItemTotal,
      };
    } else {
      merged.push(result);
    }
  });

  return merged;
};
