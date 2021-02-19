import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { ChartData } from "../types";

import ChartContainer from "./ChartContainer";

interface Props extends ChartData {}

const BarChart = (props: Props): React.ReactElement => {
  const node = useRef<SVGSVGElement | null>(null);

  const { x = [2015, 2020, 2040, 2050, 2060, 2080], y = [100, 200] } = props;

  useEffect(() => {
    const w = 1000;
    const h = 800;

    const svg = d3.select(node.current).attr("width", w).attr("height", h);

    const xAxis = d3.scaleBand().range([0, w]).padding(0.4);
    const yAxis = d3.scaleLinear().range([h, 0]);

    xAxis.domain(x.map((xValue) => xValue.toFixed(0)));
    yAxis.domain([0, 500]);

    const gXAxis = svg.append("g").attr("transform", `translate(100, 100)`);

    gXAxis
      .append("g")
      .attr("transform", `translate(0, 500)`)
      .call(d3.axisBottom(xAxis));

    gXAxis
      .append("g")
      .call(
        d3
          .axisLeft(yAxis)
          .tickFormat((d) => d.toString())
          .ticks(10)
      )
      .append("text")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("value");
  }, [x, y]);

  return (
    <ChartContainer>
      <svg className="chart_root" ref={node} />
    </ChartContainer>
  );
};

export default BarChart;
