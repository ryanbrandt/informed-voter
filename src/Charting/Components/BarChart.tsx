import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { ChartData } from "../types";

import ChartContainer from "./ChartContainer";

interface Props extends ChartData {}

const BarChart = (props: Props): React.ReactElement => {
  const node = useRef<SVGSVGElement | null>(null);

  const { x, y } = props;

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 100 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(node.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxis = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(x.map((xValue) => xValue.toString()));

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xAxis))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const yAxis = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, Math.max(...y)]);

    svg.append("g").call(d3.axisLeft(yAxis).tickFormat((t) => `$ ${t}`));

    svg
      .selectAll("rect")
      .data(y)
      .enter()
      .append("rect")
      .style("fill", "#506670c5")
      .attr("width", xAxis.bandwidth())
      .attr("x", (d, i) => xAxis(x[i].toString()) || -1)
      .attr("y", (d) => yAxis(d))
      .attr("height", (d) => height - yAxis(d));
  }, []);

  return (
    <ChartContainer>
      <svg ref={node} />
    </ChartContainer>
  );
};

export default BarChart;
