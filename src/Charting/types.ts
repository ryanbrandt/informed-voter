import { WindowSize } from "../App/types";

export type TwoDimensionalChartOption = "bar" | "line" | "scatter";

export type Tick = "$";

export interface ChartGeneratorLabelOptions {
  hasLabel?: boolean;
  labelTick?: Tick;
}

export interface ChartGeneratorOptions {
  labelOptions?: ChartGeneratorLabelOptions;
}

export interface IChartGenerator<T> {
  (
    node: React.MutableRefObject<SVGSVGElement | null>,
    data: Array<T>,
    windowSize: WindowSize,
    options?: ChartGeneratorOptions
  ): void;
}

export interface ChartProps<T> {
  data: Array<T>;
  options?: ChartGeneratorOptions;
}

export interface TwoDimensionalPoint {
  x: number | string;
  y: number;
}
