import React from "react";
import { connect } from "react-redux";

import { Row, Badge } from "handsome-ui";
import { RootState } from "../../store/rootReducer";
import { Office, PoliticalParty } from "../../common/types";
import { getOffice, getPartyAffiliation, getQuery } from "../selectors";

interface StateProps {
  query: string | null;
  partyAffiliation: PoliticalParty | null;
  office: Office | null;
}

const CandidateSearchStatus = (props: StateProps): React.ReactElement => {
  const { query, partyAffiliation, office } = props;

  return (
    <div className="candidate_search-status-container">
      {query && <Badge className="candidate_search-status" content={query} />}
      {partyAffiliation && (
        <Badge
          className="candidate_search-status-secondary"
          content={partyAffiliation}
        />
      )}
      {office && (
        <Badge className="candidate_search-status-secondary" content={office} />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  query: getQuery(state),
  partyAffiliation: getPartyAffiliation(state),
  office: getOffice(state),
});

export default connect<StateProps, void, {}, RootState>(mapStateToProps)(
  CandidateSearchStatus
);
