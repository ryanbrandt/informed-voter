import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Select, Row } from "handsome-ui";
import { Office, PoliticalParty } from "../../common/types";
import { RootState } from "../../store/rootReducer";
import { getOffice, getPartyAffiliation } from "../selectors";
import { setOffice, setPartyAffiliation } from "../actions";
import { OFFICE_OPTIONS, PARTY_OPTIONS } from "../../common/constants";

interface StateProps {
  office: Office | null;
  partyAffiliation: PoliticalParty | null;
}

interface DispatchProps {
  onOfficeChange: (office: Office) => void;
  onPartyChange: (party: PoliticalParty) => void;
}

const CandidateSearchSelections = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const { office, partyAffiliation, onOfficeChange, onPartyChange } = props;

  return (
    <Row>
      <Select
        value={partyAffiliation || ""}
        onChange={(value: PoliticalParty) => onPartyChange(value)}
        label="Party Affiliation"
        options={PARTY_OPTIONS}
      />
      <Select
        value={office || ""}
        onChange={(value: Office) => onOfficeChange(value)}
        label="Office"
        options={OFFICE_OPTIONS}
      />
    </Row>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  office: getOffice(state),
  partyAffiliation: getPartyAffiliation(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onOfficeChange: (office: Office) => dispatch(setOffice(office)),
  onPartyChange: (party: PoliticalParty) =>
    dispatch(setPartyAffiliation(party)),
});

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CandidateSearchSelections);
