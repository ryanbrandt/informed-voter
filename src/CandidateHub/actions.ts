import * as t from "./actionTypes";
import { CandidateInfo } from "./types";

export interface ISetActiveCandidate {
  type: t.T_SET_ACTIVE_CANDIDATE;
  id: string;
}

export function setActiveCandidate(id: string): ISetActiveCandidate {
  return {
    type: t.SET_ACTIVE_CANDIDATE,
    id,
  };
}

export interface IActiveCandidateInfoRequest {
  type: t.T_ACTIVE_CANDIDATE_INFO_REQUEST;
}

export function activeCandidateInfoRequest(): IActiveCandidateInfoRequest {
  return {
    type: t.ACTIVE_CANDIDATE_INFO_REQUEST,
  };
}

export interface IActiveCandidateInfoSuccess {
  type: t.T_ACTIVE_CANDIDATE_INFO_SUCCESS;
  info: CandidateInfo;
}

export function activeCandidateInfoSuccess(
  info: CandidateInfo
): IActiveCandidateInfoSuccess {
  return {
    type: t.ACTIVE_CANDIDATE_INFO_SUCCESS,
    info,
  };
}

export interface ISetCandidateHubProcessing {
  type: t.T_SET_CANDIDATE_HUB_PROCESSING;
  processing: boolean;
}

export function setCandidateHubProcessing(
  processing: boolean
): ISetCandidateHubProcessing {
  return {
    type: t.SET_CANDIDATE_HUB_PROCESSING,
    processing,
  };
}

export type Action =
  | ISetActiveCandidate
  | IActiveCandidateInfoSuccess
  | ISetCandidateHubProcessing;
