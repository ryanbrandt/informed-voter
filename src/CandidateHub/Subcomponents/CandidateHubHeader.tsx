import React from "react";
import { connect } from "react-redux";

import { Column, Divider, Row, Breadcrumbs } from "handsome-ui";

import { RootState } from "../../store/rootReducer";
import { DEFAULT_CANDIDATE_INFO } from "../constants";
import { getCandidateInfo } from "../selectors";
import { CandidateInfo } from "../types";
import { history } from "../../routes";

interface StateProps {
  candidateInfo: CandidateInfo | null;
}

const CandidateHubHeader = (props: StateProps): React.ReactElement => {
  let { candidateInfo } = props;
  if (!candidateInfo) {
    candidateInfo = DEFAULT_CANDIDATE_INFO;
  }

  const {
    name,
    city,
    state,
    party,
    office,
    raisedFunds,
    cycles,
  } = candidateInfo;

  const _renderInfoContent = (): React.ReactNode => {
    let parsedRaisedFunds = "No";
    if (raisedFunds) {
      parsedRaisedFunds = "Yes";
    }

    return (
      <div className="candidate_hub-info-banner">
        <Row version="space-evenly" className="candidate_hub-info-container">
          <Column>
            <div className="candidate_hub-info-text">State: {state}</div>
            <div className="candidate_hub-info-text">City: {city}</div>
          </Column>
          <Column>
            <div className="candidate_hub-info-text">Office: {office}</div>
            <div className="candidate_hub-info-text">
              Has Raised Funds: {parsedRaisedFunds}
            </div>
          </Column>
          <Column>
            <div className="candidate_hub-info-text">Party: {party}</div>
            <div className="candidate_hub-info-text">
              Election Cycles: {cycles.join(", ")}
            </div>
          </Column>
        </Row>
      </div>
    );
  };

  const _renderBreadCrumbs = (): React.ReactNode => {
    return (
      <Breadcrumbs
        crumbs={[
          {
            title: "Candidate Search",
            action: () => history.push("/candidate-search"),
          },
          {
            title: `${name} for ${office}`,
            disabled: true,
            action: () => null,
          },
        ]}
      />
    );
  };

  return (
    <div>
      {_renderBreadCrumbs()}
      <div className="candidate_hub-header">
        {name} for {office}
      </div>
      <Divider />
      {_renderInfoContent()}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  candidateInfo: getCandidateInfo(state),
});

export default connect<StateProps, void, {}, RootState>(mapStateToProps)(
  CandidateHubHeader
);
