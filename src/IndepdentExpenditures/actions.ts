import * as t from "./actionTypes";
import { IndependentExpendituresTotals } from "./types";

export interface IIndependentExpendituresTotalsRequest {
  type: t.T_INDEPENDENT_EXPENDITURES_TOTALS_REQUEST;
  candidateId: string;
}

export function independentExpendituresTotalsRequest(
  candidateId: string
): IIndependentExpendituresTotalsRequest {
  return {
    type: t.INDEPENDENT_EXPENDITURES_TOTALS_REQUEST,
    candidateId,
  };
}

export interface IIndependentExpendituresTotalsSuccess {
  type: t.T_INDEPENDENT_EXPENDITURES_TOTALS_SUCCESS;
  totals: Array<IndependentExpendituresTotals>;
}

export function independentExpendituresTotalsSuccess(
  totals: Array<IndependentExpendituresTotals>
): IIndependentExpendituresTotalsSuccess {
  return {
    type: t.INDEPENDENT_EXPENDITURES_TOTALS_SUCCESS,
    totals,
  };
}

export interface IIndependentExpendituresTotalsSetActiveCycle {
  type: t.T_INDEPENDENT_EXPENDITURES_TOTALS_SET_ACTIVE_CYCLE;
  cycle: number;
}

export function independetExpendituresTotalsSetActiveCycle(
  cycle: number
): IIndependentExpendituresTotalsSetActiveCycle {
  return {
    type: t.INDEPENDENT_EXPENDITURES_TOTALS_SET_ACTIVE_CYCLE,
    cycle,
  };
}

export type Action =
  | IIndependentExpendituresTotalsSuccess
  | IIndependentExpendituresTotalsSetActiveCycle;
