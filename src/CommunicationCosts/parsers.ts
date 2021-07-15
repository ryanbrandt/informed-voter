import { IFecApiResultsParser } from "../api/types";
import { findUnmergedCycleData } from "../utils/helpers";
import { CommunicationCosts, FecCommunicationCostsResults } from "./types";

export const fecCommunicationCostsResultsParser: IFecApiResultsParser<
  FecCommunicationCostsResults,
  Array<CommunicationCosts>
> = (costs: Array<FecCommunicationCostsResults>): Array<CommunicationCosts> => {
  const mapped = costs
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

  const merged: Array<CommunicationCosts> = [];
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
