import { combineReducers } from "redux";

import searchReducer, { SearchState } from "../CandidateSearch/reducer";
import candidateHubReducer, {
  CandidateHubState,
} from "../CandidateHub/reducer";
import electioneeringReducer, {
  ElectioneeringState,
} from "../Electioneering/reducer";
import independentExpendituresReducer, {
  IndependentExpendituresState,
} from "../IndepdentExpenditures/reducer";
import communicationCostsReducer, {
  CommunicationCostsState,
} from "../CommunicationCosts/reducer";

export interface RootState {
  search: SearchState;
  candidateHub: CandidateHubState;
  electioneering: ElectioneeringState;
  independentExpenditures: IndependentExpendituresState;
  communicationCosts: CommunicationCostsState;
}

export default combineReducers<RootState>({
  search: searchReducer,
  candidateHub: candidateHubReducer,
  electioneering: electioneeringReducer,
  independentExpenditures: independentExpendituresReducer,
  communicationCosts: communicationCostsReducer,
});
