import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../../store/rootReducer";
import { Office, PoliticalParty } from "../../common/types";
import { getOffice, getPartyAffiliation, getQuery } from "../selectors";
import { setOffice, setPartyAffiliation, setQuery } from "../actions";

import RemovableBadge from "../../common/Components/RemovableBadge";

interface StateProps {
  query: string | null;
  partyAffiliation: PoliticalParty | null;
  office: Office | null;
}

interface DispatchProps {
  removeQuery: () => void;
  removeOffice: () => void;
  removePartyAffiliation: () => void;
}

const CandidateSearchStatus = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const {
    query,
    partyAffiliation,
    office,
    removeOffice,
    removePartyAffiliation,
    removeQuery,
  } = props;

  return (
    <div className="candidate_search-status-container">
      {query && (
        <RemovableBadge
          className="app-fade candidate_search-status"
          onRemove={removeQuery}
          content={query}
        />
      )}
      {partyAffiliation && (
        <RemovableBadge
          className="app-fade candidate_search-status-secondary"
          onRemove={removePartyAffiliation}
          content={partyAffiliation}
        />
      )}
      {office && (
        <RemovableBadge
          className="app-fade candidate_search-status-secondary"
          onRemove={removeOffice}
          content={office}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  query: getQuery(state),
  partyAffiliation: getPartyAffiliation(state),
  office: getOffice(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeQuery: () => dispatch(setQuery(null)),
  removeOffice: () => dispatch(setOffice(null)),
  removePartyAffiliation: () => dispatch(setPartyAffiliation(null)),
});

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CandidateSearchStatus);
