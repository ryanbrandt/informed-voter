import { ApiResponse } from "apisauce";

import { IFecParser } from "./types";
import { DEFAULT_FEC_API_RESPONSE } from "../common/constants";
import { BaseFecResponse } from "../common/types";
import api from "./api";

export const getAndParse = async <T, U>(
  url: string,
  parser: IFecParser<T, U>
): Promise<U> => {
  const {
    ok,
    status,
    problem,
    data = DEFAULT_FEC_API_RESPONSE,
  }: ApiResponse<BaseFecResponse<T>> = await api.get(url);

  if (!ok) {
    throw Error(`Non-OK response: ${status} - ${problem}`);
  }

  const { results } = data;

  return parser(results);
};
