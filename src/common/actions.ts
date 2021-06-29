import * as t from "./actionTypes";

export interface IFecNonOkResponse {
  type: t.T_FEC_NON_OK_RESPONSE;
}

export function fecNonOkResponse(): IFecNonOkResponse {
  return {
    type: t.FEC_NON_OK_RESPONSE,
  };
}
