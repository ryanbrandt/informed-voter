import * as t from "./actionTypes";

import { Office, PoliticalParty } from "../common/types";
import { SearchAction } from "./actions";
import { SearchResults } from "./types";

export interface SearchState {
  query: string | null;
  party: PoliticalParty | null;
  office: Office | null;
  processing: boolean;
  candidates: SearchResults[];
}

const initialState: SearchState = {
  query: null,
  party: null,
  office: null,
  processing: false,
  candidates: [],
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
        office: office || null,
      };
    }

    case t.SET_PARTY_AFFILIATION: {
      const { party } = action;

      return {
        ...state,
        party: party || null,
      };
    }

    case t.SET_QUERY: {
      const { query } = action;

      let fixedQuery: string | null = query?.trim() || null;
      if (fixedQuery && fixedQuery.length < 1) {
        fixedQuery = null;
      }

      return {
        ...state,
        query: fixedQuery,
      };
    }

    case t.CANDIDATE_SEARCH_SUCCESS: {
      const { candidates } = action;

      return {
        ...state,
        candidates,
      };
    }

    case t.SET_SEARCH_PROCESSING: {
      const { processing } = action;

      return {
        ...state,
        processing,
      };
    }

    default: {
      return state;
    }
  }
}
