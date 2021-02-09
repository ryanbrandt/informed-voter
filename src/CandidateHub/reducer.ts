import * as t from "./actionTypes";
import { Action } from "./actions";
import { CandidateInfo } from "./types";

export interface CandidateHubState {
  candidateId: string | null;
  candidateInfo: CandidateInfo | null;
  processing: boolean;
}

const initialState: CandidateHubState = {
  candidateId: null,
  candidateInfo: null,
  processing: false,
};

export default function (
  state = initialState,
  action: Action
): CandidateHubState {
  switch (action.type) {
    case t.SET_ACTIVE_CANDIDATE: {
      const { id } = action;

      return {
        ...state,
        candidateId: id,
      };
    }

    case t.ACTIVE_CANDIDATE_INFO_SUCCESS: {
      const { info } = action;

      return {
        ...state,
        candidateInfo: info,
      };
    }

    case t.SET_CANDIDATE_HUB_PROCESSING: {
      const { processing } = action;

      return {
        ...state,
        processing,
      };
    }

    default: {
      return state;
    }
  }
}
