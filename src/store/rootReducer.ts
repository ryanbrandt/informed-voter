import { combineReducers } from "redux";

import searchReducer, { SearchState } from "../CandidateSearch/reducer";
import candidateHubReducer, {
  CandidateHubState,
} from "../CandidateHub/reducer";

export interface RootState {
  search: SearchState;
  candidateHub: CandidateHubState;
}

export default combineReducers<RootState>({
  search: searchReducer,
  candidateHub: candidateHubReducer,
});
