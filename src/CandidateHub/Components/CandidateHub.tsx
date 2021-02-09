import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { LoadingOverlay } from "handsome-ui";

import { getCandidateHubProcessing } from "../selectors";
import { activeCandidateInfoRequest } from "../actions";
import { RootState } from "../../store/rootReducer";

interface StateProps {
  processing: boolean;
}

interface DispatchProps {
  retrieveCandidateInfo: () => void;
}

const CandidateHub = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const { retrieveCandidateInfo } = props;

  useEffect(() => {
    retrieveCandidateInfo();
  }, [retrieveCandidateInfo]);

  const { processing } = props;

  return (
    <div>
      <LoadingOverlay show={processing} />
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  processing: getCandidateHubProcessing(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  retrieveCandidateInfo: () => dispatch(activeCandidateInfoRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateHub);
