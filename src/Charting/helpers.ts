import * as generators from "./generators";
import {
  IChartGenerator,
  TwoDimensionalChartOption,
  TwoDimensionalPoint,
} from "./types";

export const brokerTwoDimensionalChart = (
  type: TwoDimensionalChartOption
): IChartGenerator<TwoDimensionalPoint> => {
  switch (type) {
    case "bar": {
      return generators.drawBarChart;
    }

    // TODO rest

    default: {
      return generators.drawBarChart;
    }
  }
};

export const numberToStringWithCommas = (num: number): string => {
  const REG_EXP = /\B(?=(\d{3})+(?!\d))/g;

  return num.toString().replace(REG_EXP, ",");
};
