import { RootState } from "../store/rootReducer";
import { CandidateInfo } from "./types";

export const getActiveCandidateId = (state: RootState): string | null =>
  state.candidateHub.candidateId;

export const getCandidateHubProcessing = (state: RootState): boolean =>
  state.candidateHub.processing;

export const getCandidateInfo = (state: RootState): CandidateInfo | null =>
  state.candidateHub.candidateInfo;
