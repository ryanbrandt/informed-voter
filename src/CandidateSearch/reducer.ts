import * as t from "./actionTypes";

import { Office, PoliticalParty } from "../common/types";
import { SearchAction } from "./actions";
import { SearchPagination, SearchResults } from "./types";

export interface SearchState {
  query: string | null;
  party: PoliticalParty | null;
  office: Office | null;
  processing: boolean;
  candidates: SearchResults[];
  pagination: SearchPagination;
}

const initialState: SearchState = {
  query: null,
  party: null,
  office: null,
  processing: false,
  candidates: [],
  pagination: {
    page: 1,
    pages: 1,
    url: "",
  },
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

      return {
        ...state,
        query,
      };
    }

    case t.CANDIDATE_SEARCH_SUCCESS: {
      const { candidates } = action;

      return {
        ...state,
        candidates,
      };
    }

    case t.SET_PAGINATION: {
      const { pagination } = action;

      return {
        ...state,
        pagination,
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
