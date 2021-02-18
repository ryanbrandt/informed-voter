import React from "react";

import SectionContainer from "../../common/Components/SectionContainer";

const ElectioneeringTotals = (): React.ReactElement => {
  const ELECTIONEERING_TOTALS_DESCRIPTION =
    "Electioneering totals describe a candidate's total expenditures on any broadcast, cable or satellite communication";

  return (
    <SectionContainer description={ELECTIONEERING_TOTALS_DESCRIPTION}>
      <div>foobar</div>
    </SectionContainer>
  );
};

export default ElectioneeringTotals;
