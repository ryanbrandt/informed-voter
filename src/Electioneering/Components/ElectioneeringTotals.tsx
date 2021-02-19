import React from "react";
import { connect } from "react-redux";

import { CyclesAndTotals } from "../types";
import { RootState } from "../../store/rootReducer";
import { getCyclesAndTotals } from "../selectors";

import SectionContainer from "../../common/Components/SectionContainer";
import BarChart from "../../Charting/Components/BarChart";

interface StateProps {
  cyclesAndTotals: CyclesAndTotals;
}

const ElectioneeringTotals = (props: StateProps): React.ReactElement => {
  const ELECTIONEERING_TOTALS_DESCRIPTION =
    "Electioneering totals describe a candidate's total expenditures on any broadcast, cable or satellite communication";

  const { cyclesAndTotals } = props;
  const { cycles, totals } = cyclesAndTotals;

  return (
    <SectionContainer description={ELECTIONEERING_TOTALS_DESCRIPTION}>
      <BarChart x={cycles} y={totals} />
    </SectionContainer>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  cyclesAndTotals: getCyclesAndTotals(state),
});

export default connect(mapStateToProps)(ElectioneeringTotals);
