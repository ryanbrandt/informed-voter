import React, { useEffect, useRef, useContext } from "react";

import { WindowSizeContext } from "../../App/context";

import { TwoDimensionalChartOption, TwoDimensionalData } from "../types";
import { brokerTwoDimensionalChart } from "../helpers";

import ChartContainer from "../Components/ChartContainer";
import NoData from "./NoData";

export interface Props extends TwoDimensionalData {
  type: TwoDimensionalChartOption;
}

const TwoDimensionalChart = (props: Props): React.ReactElement => {
  const windowSize = useContext(WindowSizeContext);

  const node = useRef<SVGSVGElement | null>(null);

  const { data, type } = props;

  useEffect(() => {
    if (data.length > 0) {
      const chartFn = brokerTwoDimensionalChart(type);
      chartFn(node, data, windowSize);
    }
  }, [data, type, windowSize]);

  const _renderChartSection = () => {
    if (data.length > 0) {
      return <svg ref={node} />;
    }

    return <NoData />;
  };

  return <ChartContainer>{_renderChartSection()}</ChartContainer>;
};

export default TwoDimensionalChart;
