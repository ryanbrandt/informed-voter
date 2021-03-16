import { CommunicationCosts, FecCommunicationCostsResults } from "./types";

export function fecCommunicationCostsResultsParser(
  costs: Array<FecCommunicationCostsResults>
): Array<CommunicationCosts> {
  return costs
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
