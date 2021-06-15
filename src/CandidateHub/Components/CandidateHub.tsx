import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { LoadingOverlay } from "handsome-ui";

import { getCandidateHubProcessing } from "../selectors";
import { RootState } from "../../store/rootReducer";
import { setActiveCandidate } from "../actions";
import { usePathParameters } from "../../App/hooks";

import CandidateHubHeader from "../Subcomponents/CandidateHubHeader";
import ElectioneeringSection from "../Subcomponents/ElectioneeringSection";
import IndepdendentExpendituresSection from "../Subcomponents/IndependentExpendituresSection";
import CommunicationCostsSection from "../Subcomponents/CommunicationCostsSection";

interface StateProps {
  processing: boolean;
}

interface DispatchProps {
  setCandidate: (id: string) => void;
}

const CandidateHub = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  usePathParameters<{ id: string }>((params) => {
    const { id } = params;
    const { setCandidate } = props;

    setCandidate(id);
  });

  const { processing } = props;

  return (
    <div>
      <CandidateHubHeader />
      <ElectioneeringSection />
      <IndepdendentExpendituresSection />
      <CommunicationCostsSection />
      <LoadingOverlay show={processing} />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  processing: getCandidateHubProcessing(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setCandidate: (id: string) => dispatch(setActiveCandidate(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateHub);
