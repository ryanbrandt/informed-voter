import * as d3 from "d3";
import { WindowSize } from "../App/hooks";

import {
  BASE_CHART_MARGIN,
  HEIGHT_BASE_MARGIN,
  INFORMED_GRAY,
  TRANSITION_DELAY,
  WIDTH_BASE_MARGIN,
} from "./constants";
import { TwoDimensionalPoint } from "./types";

export const drawBarChart = (
  node: React.MutableRefObject<SVGSVGElement | null>,
  data: Array<TwoDimensionalPoint>,
  windowSize: WindowSize
): void => {
  const { width, height } = windowSize;

  const chartWidth =
    Math.max(width - WIDTH_BASE_MARGIN, 480) -
    BASE_CHART_MARGIN.left -
    BASE_CHART_MARGIN.right;
  const chartHeight =
    Math.max(height - HEIGHT_BASE_MARGIN, 250) -
    BASE_CHART_MARGIN.top -
    BASE_CHART_MARGIN.bottom;

  d3.select(node.current).selectAll("*").remove();

  const svg = d3
    .select(node.current)

    .attr(
      "width",
      chartWidth + BASE_CHART_MARGIN.left + BASE_CHART_MARGIN.right
    )
    .attr(
      "height",
      chartHeight + BASE_CHART_MARGIN.top + BASE_CHART_MARGIN.bottom
    )
    .append("g")
    .attr(
      "transform",
      `translate(${BASE_CHART_MARGIN.left},${BASE_CHART_MARGIN.top})`
    );

  const xAxis = d3
    .scaleBand()
    .range([0, chartWidth])
    .padding(0.4)
    .domain(data.map((point) => point.x.toString()));

  svg
    .append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xAxis))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .attr("font-size", "14px")
    .attr("font-family", "Sofia Pro")
    .attr("font-weight", "600")
    .style("text-anchor", "end");

  const yAxis = d3
    .scaleLinear()
    .range([chartHeight, 0])
    .domain([0, Math.max(...data.map((point) => point.y))]);

  svg
    .append("g")
    .call(d3.axisLeft(yAxis).ticks(10, "s"))
    .attr("font-size", "12px")
    .attr("font-family", "Sofia Pro");

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "app-opacity-in")
    .style("fill", INFORMED_GRAY)
    .attr("width", xAxis.bandwidth())
    .attr("x", (d) => xAxis(d.x.toString()) || -1)
    .attr("y", () => yAxis(0))
    .attr("height", () => chartHeight - yAxis(0))
    .transition()
    .duration(TRANSITION_DELAY)
    .attr("y", (d) => yAxis(d.y))
    .attr("height", (d) => chartHeight - yAxis(d.y));
};
