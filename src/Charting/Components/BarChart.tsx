import React, { useEffect, useRef, useContext } from "react";

import { WindowSizeContext } from "../../App/context";

import { Tick, TwoDimensionalData } from "../types";
import { drawBarChart } from "../generators";

import ChartContainer from "./ChartContainer";

export interface Props extends TwoDimensionalData {
  yAxisTick?: Tick;
}

const BarChart = (props: Props): React.ReactElement => {
  const windowSize = useContext(WindowSizeContext);

  const node = useRef<SVGSVGElement | null>(null);

  const { data } = props;

  useEffect(() => {
    const { width, height } = windowSize;

    drawBarChart(data, node, width, height);
  }, [data, windowSize]);

  return (
    <ChartContainer>
      <svg ref={node} />
    </ChartContainer>
  );
};

export default BarChart;
