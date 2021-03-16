import { createSelector } from "reselect";
import { TwoDimensionalPoint } from "../Charting/types";

import { RootState } from "../store/rootReducer";
import { CommunicationCosts } from "./types";

export const getCommunicationCosts = (
  state: RootState
): Array<CommunicationCosts> => state.communicationCosts.costs;

export const getCommunicationCostsActiveCycle = (state: RootState): number =>
  state.communicationCosts.activeCycle;

export const getCommunicationCostsCycles = createSelector(
  getCommunicationCosts,
  (costs): Array<number> => {
    const cycles = costs.map((cost) => cost.cycle);

    const uniqueCycles: Array<number> = [];
    cycles.forEach((cycle) => {
      if (!uniqueCycles.includes(cycle)) {
        uniqueCycles.push(cycle);
      }
    });

    return uniqueCycles.sort((a, b) => b - a);
  }
);

export const getCommunicationCostsForActiveCycle = createSelector(
  getCommunicationCosts,
  getCommunicationCostsActiveCycle,
  (costs, cycle): Array<TwoDimensionalPoint> => {
    return costs
      .filter((cost) => cost.cycle === cycle)
      .map((cost) => {
        const { oppose, total } = cost;

        let x = "Support";
        if (oppose) {
          x = "Oppose";
        }

        return {
          x,
          y: total,
        };
      });
  }
);
