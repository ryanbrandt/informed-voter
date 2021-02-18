import { combineReducers } from "redux";

import searchReducer, { SearchState } from "../CandidateSearch/reducer";
import candidateHubReducer, {
  CandidateHubState,
} from "../CandidateHub/reducer";
import electioneeringReducer, {
  ElectioneeringState,
} from "../Electioneering/reducer";

export interface RootState {
  search: SearchState;
  candidateHub: CandidateHubState;
  electioneering: ElectioneeringState;
}

export default combineReducers<RootState>({
  search: searchReducer,
  candidateHub: candidateHubReducer,
  electioneering: electioneeringReducer,
});
