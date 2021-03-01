import { createSelector } from "reselect";
import { TwoDimensionalPoint } from "../Charting/types";

import { RootState } from "../store/rootReducer";
import { IndependentExpendituresTotals } from "./types";

export const getIndependentExpenditureTotals = (
  state: RootState
): Array<IndependentExpendituresTotals> => state.independentExpenditures.totals;

export const getIndependentExpendituresActiveCycle = (
  state: RootState
): number => state.independentExpenditures.activeCycle;

export const getIndependentExpenditureCycles = createSelector(
  getIndependentExpenditureTotals,
  (expenditures): Array<number> => {
    const cycles = expenditures.map((expenditure) => expenditure.cycle);

    const uniqueCycles: Array<number> = [];
    cycles.forEach((cycle) => {
      if (!uniqueCycles.includes(cycle)) {
        uniqueCycles.push(cycle);
      }
    });

    return uniqueCycles;
  }
);

export const getIndependentExpenditureForActiveCycle = createSelector(
  getIndependentExpenditureTotals,
  getIndependentExpendituresActiveCycle,
  (expenditures, cycle): Array<TwoDimensionalPoint> => {
    return expenditures
      .filter((expenditure) => expenditure.cycle === cycle)
      .map((expenditure) => {
        const { oppose, total } = expenditure;

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
