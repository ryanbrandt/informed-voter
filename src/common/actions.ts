import { PROBLEM_CODE } from "apisauce";
import { IFecParser } from "../utils/types";
import * as t from "./actionTypes";

export interface IFecApiError {
  type: t.T_FEC_API_ERROR;
  status: number;
  problem: PROBLEM_CODE;
}

export function fecApiError(
  status: number,
  problem: PROBLEM_CODE
): IFecApiError {
  return {
    type: t.FEC_API_ERROR,
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

export interface IFecApiRequest<T, U> {
  type: t.T_FEC_API_REQUEST;
  path: string;
  onSuccess: PutEffectFn<U>;
  parser: IFecParser<T, U>;

  requireResults?: boolean;
  emitError?: boolean;
}

export function fecApiRequest<T, U>(
  path: string,
  onSuccess: PutEffectFn<U>,
  parser: IFecParser<T, U>,

  requireResults = false,
  emitError = true
): IFecApiRequest<T, U> {
  return {
    type: t.FEC_API_REQUEST,
    path,
    onSuccess,
    parser,
    requireResults,
    emitError,
  };
}
