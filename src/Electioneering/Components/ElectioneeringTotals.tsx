import React from "react";
import { connect } from "react-redux";

import { RootState } from "../../store/rootReducer";
import { getTotalsByCycleChartData } from "../selectors";

import SectionContainer from "../../common/Components/SectionContainer";
import BarChart from "../../Charting/Components/BarChart";
import { TwoDimensionalPoint } from "../../Charting/types";

interface StateProps {
  totalsByCycleData: Array<TwoDimensionalPoint>;
}

const ElectioneeringTotals = (props: StateProps): React.ReactElement => {
  const ELECTIONEERING_TOTALS_DESCRIPTION =
    "Electioneering totals describe a candidate's total expenditures on any broadcast, cable or satellite communication";

  const { totalsByCycleData } = props;

  return (
    <SectionContainer description={ELECTIONEERING_TOTALS_DESCRIPTION}>
      <BarChart data={totalsByCycleData} yAxisTick="$" />
    </SectionContainer>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  totalsByCycleData: getTotalsByCycleChartData(state),
});

export default connect(mapStateToProps)(ElectioneeringTotals);
