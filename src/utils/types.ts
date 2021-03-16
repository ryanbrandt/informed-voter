export interface IFecParser<T, U> {
  (results: Array<T>): U;
}
