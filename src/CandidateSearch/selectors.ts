import { createSelector } from "reselect";

import { Office, PoliticalParty } from "../common/types";
import { RootState } from "../store/rootReducer";
import { SearchPagination, SearchResults } from "./types";

export const getQuery = (state: RootState): string | null => state.search.query;
export const getPartyAffiliation = (state: RootState): PoliticalParty | null =>
  state.search.party;
export const getOffice = (state: RootState): Office | null =>
  state.search.office;

export const getSearchProcessing = (state: RootState): boolean =>
  state.search.processing;

export const getCandidates = (state: RootState): SearchResults[] =>
  state.search.candidates;

export const getPagination = (state: RootState): SearchPagination =>
  state.search.pagination;

export const getCurrentPage = createSelector(
  [getPagination],
  (pagination): number => {
    const { page } = pagination;

    return page;
  }
);

export const getTotalPages = createSelector(
  [getPagination],
  (pagination): number => {
    const { pages } = pagination;

    return pages;
  }
);

export const getPaginationUrl = createSelector(
  [getPagination],
  (pagination): string => {
    const { url } = pagination;

    return url;
  }
);

export const getHasNextPage = createSelector(
  [getPagination],
  (pagination): boolean => {
    const { page, pages } = pagination;

    let hasNext = false;
    if (page < pages) {
      hasNext = true;
    }

    return hasNext;
  }
);

export const getHasPrevPage = createSelector(
  [getPagination],
  (pagination): boolean => {
    const { page, pages } = pagination;

    let hasPrev = false;
    if (page > pages) {
      hasPrev = true;
    }

    return hasPrev;
  }
);
