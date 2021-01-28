import * as t from "./actionTypes";

import { Office, PoliticalParty } from "../common/types";
import { SearchAction } from "./actions";

export interface SearchState {
  query: string | null;
  party: PoliticalParty | null;
  office: Office | null;
}

const initialState: SearchState = {
  query: null,
  party: null,
  office: null,
};

export default function (
  state = initialState,
  action: SearchAction
): SearchState {
  switch (action.type) {
    case t.SET_OFFICE: {
      const { office } = action;

      return {
        ...state,
        office,
      };
    }

    case t.SET_PARTY_AFFILIATION: {
      const { party } = action;

      return {
        ...state,
        party,
      };
    }

    case t.SET_QUERY: {
      const { query } = action;

      let fixedQuery: string | null = query.trim();
      if (query.length < 1) {
        fixedQuery = null;
      }

      return {
        ...state,
        query: fixedQuery,
      };
    }

    default: {
      return state;
    }
  }
}
