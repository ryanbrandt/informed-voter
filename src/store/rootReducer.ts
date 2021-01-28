import { combineReducers } from "redux";

import searchReducer, { SearchState } from "../CandidateSearch/reducer";

export interface RootState {
  search: SearchState;
}

export default combineReducers({ search: searchReducer });
