import * as t from "./actionTypes";
import { Action } from "./actions";
import { ElectioneeringTotals } from "./types";

export interface ElectioneeringState {
  totals: Array<ElectioneeringTotals>;
}

const initialState: ElectioneeringState = {
  totals: [],
};

export default function (
  state = initialState,
  action: Action
): ElectioneeringState {
  switch (action.type) {
    case t.ELECTIONEERING_TOTALS_SUCCESS: {
      const { totals } = action;

      return {
        ...state,
        totals,
      };
    }

    default: {
      return state;
    }
  }
}
