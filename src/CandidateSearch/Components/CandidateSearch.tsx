import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Button, BounceLouder } from "handsome-ui";

import {
  candidateSearchRequest,
  setOffice,
  setPartyAffiliation,
  setQuery,
} from "../actions";
import { getSearchProcessing } from "../selectors";
import { useQueryParameters } from "../../App/hooks";

import { Office, PoliticalParty } from "../../common/types";
import { RootState } from "../../store/rootReducer";

import CandidateSearchInput from "../Subcomponents/CandidateSearchInput";
import CandidateSearchSelections from "../Subcomponents/CandidateSearchSelections";
import CandidateSearchStatus from "../Subcomponents/CandidateSearchStatus";
import CandidateTable from "./CandidateTable";

interface StateProps {
  processing: boolean;
}

interface DispatchProps {
  searchCandidates: () => void;
  setCandidateQuery: (query: string | null) => void;
  setCandidateOffice: (office: Office | null) => void;
  setCandidateParty: (party: PoliticalParty | null) => void;
}

interface SearchQueryParameters {
  query: string | null;
  party: PoliticalParty | null;
  office: Office | null;
}

const CandidateSearch = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const { searchCandidates } = props;

  useQueryParameters<SearchQueryParameters>((params) => {
    const { setCandidateQuery, setCandidateParty, setCandidateOffice } = props;
    const { query, party, office } = params;

    setCandidateQuery(query);
    setCandidateParty(party);
    setCandidateOffice(office);

    searchCandidates();
  });

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
        <BounceLouder className="candidate_search-loader" />
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
  setCandidateQuery: (query: string | null) => dispatch(setQuery(query)),
  setCandidateOffice: (office: Office | null) => dispatch(setOffice(office)),
  setCandidateParty: (party: PoliticalParty | null) =>
    dispatch(setPartyAffiliation(party)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSearch);
