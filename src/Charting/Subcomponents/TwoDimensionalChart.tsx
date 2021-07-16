import React, { useEffect, useRef } from "react";

import { useWindowSize } from "../../App/hooks";

import {
  TwoDimensionalChartOption,
  ChartProps,
  TwoDimensionalPoint,
} from "../types";
import { brokerTwoDimensionalChart } from "../helpers";

import ChartContainer from "../Components/ChartContainer";
import NoData from "./NoData";
import { BASE_TWO_DIMENSIONAL_CHART_OPTIONS } from "../constants";

export interface Props extends ChartProps<TwoDimensionalPoint> {
  type: TwoDimensionalChartOption;
}

const TwoDimensionalChart = (props: Props): React.ReactElement => {
  const windowSize = useWindowSize();

  const node = useRef<SVGSVGElement | null>(null);

  const { data, type, options = BASE_TWO_DIMENSIONAL_CHART_OPTIONS } = props;

  useEffect(() => {
    if (data.length > 0) {
      const chartFn = brokerTwoDimensionalChart(type);
      chartFn(node, data, windowSize, options);
    }
  }, [data, type, windowSize, options]);

  const _renderChartSection = () => {
    if (data.length > 0) {
      return <svg ref={node} />;
    }

    return <NoData />;
  };

  return <ChartContainer>{_renderChartSection()}</ChartContainer>;
};

export default TwoDimensionalChart;
