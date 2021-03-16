import * as t from "./actionTypes";
import { CommunicationCosts } from "./types";

export interface ICommunicationCostsRequest {
  type: t.T_COMMUNCATION_COSTS_REQUEST;
  candidateId: string;
}

export function communicationCostsRequest(
  candidateId: string
): ICommunicationCostsRequest {
  return {
    type: t.COMMUNICATION_COSTS_REQUEST,
    candidateId,
  };
}

export interface ICommunicationCostsSuccess {
  type: t.T_COMMUNICATION_COSTS_SUCCESS;
  costs: Array<CommunicationCosts>;
}

export function communicationCostsSuccess(
  costs: Array<CommunicationCosts>
): ICommunicationCostsSuccess {
  return {
    type: t.COMMUNICATION_COSTS_SUCCESS,
    costs,
  };
}

export interface ICommunicationCostsSetActiveCycle {
  type: t.T_COMMUNICATION_COSTS_SET_ACTIVE_CYCLE;
  cycle: number;
}

export function communicationCostsSetActiveCycle(
  cycle: number
): ICommunicationCostsSetActiveCycle {
  return {
    type: t.COMMUNICATION_COSTS_SET_ACTIVE_CYCLE,
    cycle,
  };
}

export type Action =
  | ICommunicationCostsSuccess
  | ICommunicationCostsSetActiveCycle;
