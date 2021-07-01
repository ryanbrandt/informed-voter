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
import {
  getSearchProcessing,
  getOffice,
  getPartyAffiliation,
  getQuery,
} from "../selectors";
import { useQueryParameters } from "../../App/hooks";

import { Office, PoliticalParty } from "../../common/types";
import { RootState } from "../../store/rootReducer";
import { history } from "../../routes";

import { objectToQueryString } from "../../utils/helpers";
import { isOffice, isPoliticalParty } from "../../common/typeGuards";

import CandidateSearchInput from "../Subcomponents/CandidateSearchInput";
import CandidateSearchSelections from "../Subcomponents/CandidateSearchSelections";
import CandidateSearchStatus from "../Subcomponents/CandidateSearchStatus";
import CandidateTable from "./CandidateTable";

interface SearchQueryParameters {
  query: string | null;
  party: PoliticalParty | null;
  office: Office | null;
}

interface StateProps extends SearchQueryParameters {
  processing: boolean;
}

interface DispatchProps {
  searchCandidates: () => void;
  setCandidateQuery: (query: string | null) => void;
  setCandidateOffice: (office: Office | null) => void;
  setCandidateParty: (party: PoliticalParty | null) => void;
}

const CandidateSearch = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const { searchCandidates } = props;

  useQueryParameters<SearchQueryParameters>((params) => {
    const { setCandidateQuery, setCandidateParty, setCandidateOffice } = props;
    const { query, party, office } = params;

    setCandidateQuery(query);

    if (isPoliticalParty(party)) {
      setCandidateParty(party);
    }

    if (isOffice(office)) {
      setCandidateOffice(office);
    }

    searchCandidates();
  });

  const onSearchCandidatesClick = (): void => {
    const { query, office, party } = props;

    history.replace(objectToQueryString({ query, office, party }));
  };

  const { processing } = props;

  return (
    <div className="candidate_search-container">
      <h1>Search Candidates</h1>
      <CandidateSearchInput />
      <CandidateSearchSelections />
      <Button
        className="candidate_search-submit-btn"
        title="Search Candidates"
        onClick={onSearchCandidatesClick}
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
  query: getQuery(state),
  office: getOffice(state),
  party: getPartyAffiliation(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  searchCandidates: () => dispatch(candidateSearchRequest()),
  setCandidateQuery: (query: string | null) => dispatch(setQuery(query)),
  setCandidateOffice: (office: Office | null) => dispatch(setOffice(office)),
  setCandidateParty: (party: PoliticalParty | null) =>
    dispatch(setPartyAffiliation(party)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateSearch);
