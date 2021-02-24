import * as d3 from "d3";

import {
  BASE_CHART_MARGIN,
  HEIGHT_BASE_MARGIN,
  INFORMED_GRAY,
  TRANSITION_DELAY,
  WIDTH_BASE_MARGIN,
} from "./constants";
import { Tick, TwoDimensionalPoint } from "./types";

export const drawBarChart = (
  data: Array<TwoDimensionalPoint>,
  node: React.MutableRefObject<SVGSVGElement | null>,
  width: number,
  height: number,
  yTick?: Tick
): void => {
  const chartWidth =
    Math.max(width - WIDTH_BASE_MARGIN, 960) -
    BASE_CHART_MARGIN.left -
    BASE_CHART_MARGIN.right;
  const chartHeight =
    Math.max(height - HEIGHT_BASE_MARGIN, 500) -
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
    .padding(0.1)
    .domain(data.map((point) => point.x.toString()));

  svg
    .append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xAxis))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  const yAxis = d3
    .scaleLinear()
    .range([chartHeight, 0])
    .domain([0, Math.max(...data.map((point) => point.y))]);

  const tick = yTick ? `${yTick} ` : "";
  svg.append("g").call(d3.axisLeft(yAxis).tickFormat((t) => `${tick}${t}`));

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
