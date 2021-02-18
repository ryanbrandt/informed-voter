import * as t from "./actionTypes";
import { ElectioneeringTotals } from "./types";

export interface IElectioneeringTotalsRequest {
  type: t.T_ELECTIONEERING_TOTALS_REQUEST;
  candidateId: string;
}

export function electioneeringTotalsRequest(
  candidateId: string
): IElectioneeringTotalsRequest {
  return {
    type: t.ELECTIONEERING_TOTALS_REQUEST,
    candidateId,
  };
}

export interface IElectioneeringTotalsSuccess {
  type: t.T_ELECTIONEERING_TOTALS_SUCCESS;
  totals: Array<ElectioneeringTotals>;
}

export function electioneeringTotalsSuccess(
  totals: Array<ElectioneeringTotals>
): IElectioneeringTotalsSuccess {
  return {
    type: t.ELECTIONEERING_TOTALS_SUCCESS,
    totals,
  };
}

export type Action = IElectioneeringTotalsSuccess;
