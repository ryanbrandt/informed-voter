export interface IFecApiResultsParser<T, U> {
  (results: Array<T>): U;
}
