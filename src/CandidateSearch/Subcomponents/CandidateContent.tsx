import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Column, Dropdown, Row } from "handsome-ui";

import { SearchResults } from "../types";
import { setActiveCandidate } from "../../CandidateHub/actions";
import { RootState } from "../../store/rootReducer";
import { history } from "../../routes";

interface Props {
  candidate: SearchResults;
}

interface DispatchProps {
  setCandidateActive: (id: string) => void;
}

const CandidateContent = (props: Props & DispatchProps): React.ReactElement => {
  const { candidate } = props;

  const _renderHeading = (): React.ReactNode => {
    const { name } = candidate;

    return <div className="candidate_search-content-header">{name}</div>;
  };

  const onSeeFullData = (): void => {
    const { setCandidateActive } = props;

    const { id } = candidate;
    setCandidateActive(id);

    history.push(`/candidate-hub/${id}`);
  };

  const { state, district, office, party } = candidate;

  return (
    <Dropdown heading={_renderHeading()}>
      <div className="candidate_search-content-container">
        <Row className="candidate_search-content-row">
          <Column>
            <div>
              <h3>State</h3>
              {state}
            </div>
            <div>
              <h3>District</h3>
              {district}
            </div>
          </Column>
          <Column>
            <div>
              <h3>Office</h3>
              {office}
            </div>
            <div>
              <h3>Party</h3>
              {party}
            </div>
          </Column>
        </Row>
        <div onClick={onSeeFullData} className="candidate_search-full-btn">
          View Full Data
        </div>
      </div>
    </Dropdown>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setCandidateActive: (id: string) => dispatch(setActiveCandidate(id)),
});

export default connect<void, DispatchProps, Props, RootState>(
  null,
  mapDispatchToProps
)(CandidateContent);
