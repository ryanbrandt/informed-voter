import * as t from "./actionTypes";
import { Action } from "./actions";
import { IndependentExpendituresTotals } from "./types";

export interface IndependentExpendituresState {
  totals: Array<IndependentExpendituresTotals>;
  activeCycle: number;
}

const initialState: IndependentExpendituresState = {
  totals: [],
  activeCycle: -1,
};

export default function (
  state = initialState,
  action: Action
): IndependentExpendituresState {
  switch (action.type) {
    case t.INDEPENDENT_EXPENDITURES_TOTALS_SUCCESS: {
      const { totals } = action;

      return {
        ...state,
        totals,
      };
    }

    case t.INDEPENDENT_EXPENDITURES_TOTALS_SET_ACTIVE_CYCLE: {
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
