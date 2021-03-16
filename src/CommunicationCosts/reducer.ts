import * as t from "./actionTypes";
import { Action } from "./actions";
import { CommunicationCosts } from "./types";

export interface CommunicationCostsState {
  costs: Array<CommunicationCosts>;
  activeCycle: number;
}

const initialState: CommunicationCostsState = {
  costs: [],
  activeCycle: -1,
};

export default function (
  state = initialState,
  action: Action
): CommunicationCostsState {
  switch (action.type) {
    case t.COMMUNICATION_COSTS_SUCCESS: {
      const { costs } = action;

      return {
        ...state,
        costs,
      };
    }

    case t.COMMUNICATION_COSTS_SET_ACTIVE_CYCLE: {
      const { cycle } = action;

      return {
        ...state,
        activeCycle: cycle,
      };
    }

    default: {
      return state;
    }
  }
}
