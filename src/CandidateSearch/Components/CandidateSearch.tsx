import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Button, Spinner } from "handsome-ui";

import { candidateSearchRequest } from "../actions";
import { getSearchProcessing } from "../selectors";

import CandidateSearchInput from "../Subcomponents/CandidateSearchInput";
import CandidateSearchSelections from "../Subcomponents/CandidateSearchSelections";
import CandidateSearchStatus from "../Subcomponents/CandidateSearchStatus";
import CandidateTable from "./CandidateTable";
import { RootState } from "../../store/rootReducer";

interface StateProps {
  processing: boolean;
}

interface DispatchProps {
  searchCandidates: () => void;
}

const CandidateSearch = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const { searchCandidates } = props;

  useEffect(() => {
    searchCandidates();
  }, [searchCandidates]);

  const { processing } = props;

  return (
    <div className="candidate_search-container">
      <h1>Search Candidates</h1>
      <CandidateSearchInput />
      <CandidateSearchSelections />
      <Button
        className="candidate_search-submit-btn"
        title="Search Candidates"
        onClick={searchCandidates}
        inverting
      />
      <CandidateSearchStatus />
      {processing ? (
        <Spinner className="candidate_search-loader" />
      ) : (
        <CandidateTable />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  processing: getSearchProcessing(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  searchCandidates: () => dispatch(candidateSearchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSearch);
