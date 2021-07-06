import { PROBLEM_CODE } from "apisauce";
import { IFecParser } from "../utils/types";
import * as t from "./actionTypes";

export interface IFecNonOkResponse {
  type: t.T_FEC_NON_OK_RESPONSE;
  status: number;
  problem: PROBLEM_CODE;
}

export function fecNonOkResponse(
  status: number,
  problem: PROBLEM_CODE
): IFecNonOkResponse {
  return {
    type: t.FEC_NON_OK_RESPONSE,
    status,
    problem,
  };
}

interface IBaseAction<T> {
  type: string;
  payload?: T;
}

interface PutEffectFn<T> {
  (payload: T): IBaseAction<T>;
}

export interface IFecApiRequest {
  type: t.T_FEC_API_REQUEST;
  path: string;
  onSuccess: PutEffectFn<any>;

  parser?: IFecParser<any, any>;
  requireResults?: boolean;
  emitError?: boolean;
}

export function fecApiRequest(
  path: string,
  onSuccess: PutEffectFn<any>,
  parser?: IFecParser<any, any>,
  requireResults = false,
  emitError = true
): IFecApiRequest {
  return {
    type: t.FEC_API_REQUEST,
    path,
    onSuccess,
    parser,
    requireResults,
    emitError,
  };
}
