import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
  getCommunicationCostsForActiveCycle,
  getCommunicationCostsCycles,
  getCommunicationCostsActiveCycle,
} from "../selectors";
import { communicationCostsSetActiveCycle } from "../actions";
import { RootState } from "../../store/rootReducer";
import { TwoDimensionalPoint } from "../../Charting/types";

import SectionContainer from "../../common/Components/SectionContainer";
import TwoDimensionalChart from "../../Charting/Subcomponents/TwoDimensionalChart";
import CycleSelector from "../../common/Components/CycleSelector";

interface DispatchProps {
  setActiveCycle: (cycle: number) => void;
}

interface StateProps {
  communicationCostsForCycle: Array<TwoDimensionalPoint>;
  availableCycles: Array<number>;
  activeCycle: number;
}

const CommunicationCosts = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const COMMUNICATIONS_COSTS_DESCRIPTION =
    "Communication costs may be defined as communications by a corporation to its stockholders and executive or administrative personnel and their families or by a labor organization to its members and their families on any subject, including the express advocacy of the election or defeat of any Federal candidate";

  const {
    communicationCostsForCycle,
    activeCycle,
    setActiveCycle,
    availableCycles,
  } = props;

  return (
    <SectionContainer description={COMMUNICATIONS_COSTS_DESCRIPTION}>
      <CycleSelector
        cycles={availableCycles}
        activeCycle={activeCycle}
        onChange={(cycle: number) => setActiveCycle(cycle)}
      />
      <TwoDimensionalChart data={communicationCostsForCycle} type="bar" />
    </SectionContainer>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setActiveCycle: (cycle: number) =>
    dispatch(communicationCostsSetActiveCycle(cycle)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  communicationCostsForCycle: getCommunicationCostsForActiveCycle(state),
  availableCycles: getCommunicationCostsCycles(state),
  activeCycle: getCommunicationCostsActiveCycle(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunicationCosts);
