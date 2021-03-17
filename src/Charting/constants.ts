import { ChartGeneratorOptions } from "./types";

export const WIDTH_BASE_MARGIN = 500;
export const HEIGHT_BASE_MARGIN = 500;

export const BASE_CHART_MARGIN = { top: 50, right: 20, bottom: 75, left: 50 };

export const INFORMED_GRAY = "#506670c5";
export const TRANSITION_DELAY = 800;

export const BASE_TWO_DIMENSIONAL_CHART_OPTIONS: ChartGeneratorOptions = {
  labelOptions: {
    hasLabel: true,
    labelTick: "$",
  },
};
