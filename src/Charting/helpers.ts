import { drawBarChart } from "./generators";
import {
  ChartGeneratorFn,
  TwoDimensionalChartOption,
  TwoDimensionalPoint,
} from "./types";

export const brokerTwoDimensionalChart = (
  type: TwoDimensionalChartOption
): ChartGeneratorFn<TwoDimensionalPoint> => {
  switch (type) {
    case "bar": {
      return drawBarChart;
    }

    // TODO rest

    default: {
      return drawBarChart;
    }
  }
};
