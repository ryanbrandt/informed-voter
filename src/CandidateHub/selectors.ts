import { RootState } from "../store/rootReducer";

export const getActiveCandidateId = (state: RootState): string | null =>
  state.candidateHub.candidateId;

export const getCandidateHubProcessing = (state: RootState): boolean =>
  state.candidateHub.processing;
