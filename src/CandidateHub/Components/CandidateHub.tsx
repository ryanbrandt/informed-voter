import React from "react";
import { connect } from "react-redux";

import { LoadingOverlay } from "handsome-ui";

import { getCandidateHubProcessing } from "../selectors";
import { RootState } from "../../store/rootReducer";

import CandidateHubHeader from "../Subcomponents/CandidateHubHeader";
import ElectioneeringSection from "../Subcomponents/ElectioneeringSection";

interface StateProps {
  processing: boolean;
}

const CandidateHub = (props: StateProps): React.ReactElement => {
  const { processing } = props;

  return (
    <div>
      <CandidateHubHeader />
      <ElectioneeringSection />
      <LoadingOverlay show={processing} />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  processing: getCandidateHubProcessing(state),
});

export default connect(mapStateToProps)(CandidateHub);
