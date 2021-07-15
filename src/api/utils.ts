import { ApiResponse, PROBLEM_CODE } from "apisauce";

import api from "./api";
import { IFecApiResultsParser } from "./types";
import { BaseFecResponse } from "../common/types";
import { DEFAULT_FEC_API_RESPONSE } from "../common/constants";

class FecApiError extends Error {
  status: number;

  constructor(status: number, problem: PROBLEM_CODE) {
    super(problem);
    this.status = status;
  }
}

export const getAndParse = async <T, U>(
  url: string,
  parser: IFecApiResultsParser<T, U>
): Promise<U> => {
  const {
    ok,
    status,
    problem,
    data = DEFAULT_FEC_API_RESPONSE,
  }: ApiResponse<BaseFecResponse<T>> = await api.get(url);

  if (!ok) {
    throw new FecApiError(status as number, problem as PROBLEM_CODE);
  }

  const { results } = data;

  return parser(results);
};
