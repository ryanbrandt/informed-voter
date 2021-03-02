import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { independetExpendituresTotalsSetActiveCycle } from "../actions";
import {
  getIndependentExpenditureForActiveCycle,
  getIndependentExpenditureCycles,
  getIndependentExpendituresActiveCycle,
} from "../selectors";
import { RootState } from "../../store/rootReducer";
import { TwoDimensionalPoint } from "../../Charting/types";

import TwoDimensionalChart from "../../Charting/Subcomponents/TwoDimensionalChart";
import SectionContainer from "../../common/Components/SectionContainer";
import CycleSelector from "../../common/Components/CycleSelector";

interface StateProps {
  independentExpenditureForCycle: Array<TwoDimensionalPoint>;
  availableCycles: Array<number>;
  activeCycle: number;
}

interface DispatchProps {
  setActiveCycle: (cycle: number) => void;
}

const IndependentExpendituresTotals = (
  props: StateProps & DispatchProps
): React.ReactElement => {
  const INDEPENDENT_EXPENDITURES_TOTALS_DESCRIPTION =
    "An independent expenditure is an expenditure for a communication expressly advocating the election or defeat of a clearly identified candidate that is not made in cooperation, consultation, or concert with, or at the request or suggestion of, a candidate, a candidate’s authorized committee, or their agents, or a political party or its agents.";

  const {
    independentExpenditureForCycle,
    activeCycle,
    setActiveCycle,
    availableCycles,
  } = props;

  return (
    <SectionContainer description={INDEPENDENT_EXPENDITURES_TOTALS_DESCRIPTION}>
      <CycleSelector
        cycles={availableCycles}
        activeCycle={activeCycle}
        onChange={(cycle: number) => setActiveCycle(cycle)}
      />
      <TwoDimensionalChart type="bar" data={independentExpenditureForCycle} />
    </SectionContainer>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setActiveCycle: (cycle: number) =>
    dispatch(independetExpendituresTotalsSetActiveCycle(cycle)),
});

const mapStateToProps = (state: RootState): StateProps => ({
  independentExpenditureForCycle: getIndependentExpenditureForActiveCycle(
    state
  ),
  availableCycles: getIndependentExpenditureCycles(state),
  activeCycle: getIndependentExpendituresActiveCycle(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndependentExpendituresTotals);
