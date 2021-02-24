export type Tick = "$" | "%";

export interface TwoDimensionalPoint {
  x: number | string;
  y: number;
}

export interface TwoDimensionalData {
  data: Array<TwoDimensionalPoint>;
}
