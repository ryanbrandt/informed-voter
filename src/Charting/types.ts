import { WindowSize } from "../App/hooks";

export type ChartGeneratorFn<T> = (
  node: React.MutableRefObject<SVGSVGElement | null>,
  data: Array<T>,
  windowSize: WindowSize
) => void;

export interface TwoDimensionalPoint {
  x: number | string;
  y: number;
}

export interface TwoDimensionalData {
  data: Array<TwoDimensionalPoint>;
}

export type TwoDimensionalChartOption = "bar" | "line" | "scatter";
