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

// linting lib error, need to parameterize this for only CycleData
export const findUnmergedCycleData = (
  data: Array<any>,
  current: any,
  additionalKeysToMatch: Array<string>,
  keysToNotMatch: Array<string>
): number =>
  data.reduce((n, item, i) => {
    let result = n;

    if (item.cycle === current.cycle) {
      let isUnmergedMatch = true;
      additionalKeysToMatch.forEach((key) => {
        if (item[key] !== current[key]) {
          isUnmergedMatch = false;
        }
      });

      keysToNotMatch.forEach((key) => {
        if (item[key] === current[key]) {
          isUnmergedMatch = false;
        }
      });

      if (isUnmergedMatch) {
        result = i;
      }
    }

    return result;
  }, -1);

export const queryStringToObject = <T>(queryString: string): T => {
  if (queryString.length < 1) {
    return {} as T;
  }

  return decodeURIComponent(queryString)
    .replace("?", "")
    .split("&")
    .reduce((parsedParams, param) => {
      const [key, value] = param.split("=");

      return { ...parsedParams, [key]: value };
    }, {}) as T;
};

export const objectToQueryString = (o: { [key: string]: any }): string => {
  return `?${Object.keys(o)
    .filter((key) => o[key] !== null && o[key] !== undefined && o[key] !== "")
    .map((key) => `${key}=${o[key]}`)
    .join("&")}`;
};
