import { createSelector } from "reselect";

import { RootState } from "../store/rootReducer";
import { CyclesAndTotals, ElectioneeringTotals } from "./types";

export const getElectioneeringTotals = (
  state: RootState
): Array<ElectioneeringTotals> => state.electioneering.totals;

export const getCyclesAndTotals = createSelector(
  getElectioneeringTotals,
  (electioneeringTotals): CyclesAndTotals => {
    return {
      cycles: electioneeringTotals.map((result) => result.cycle),
      totals: electioneeringTotals.map((result) => result.total),
    };
  }
);
