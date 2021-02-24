import { createSelector } from "reselect";
import { TwoDimensionalPoint } from "../Charting/types";

import { RootState } from "../store/rootReducer";
import { ElectioneeringTotals } from "./types";

export const getElectioneeringTotals = (
  state: RootState
): Array<ElectioneeringTotals> => state.electioneering.totals;

export const getTotalsByCycleChartData = createSelector(
  getElectioneeringTotals,
  (electioneeringTotals): Array<TwoDimensionalPoint> => {
    return electioneeringTotals.map((total) => ({
      x: total.cycle,
      y: total.total,
    }));
  }
);
