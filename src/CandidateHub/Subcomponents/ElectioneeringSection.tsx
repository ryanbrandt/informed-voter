import React from "react";

import ElectioneeringTotals from "../../Electioneering/Components/ElectioneeringTotals";
import CandidateHubDropdownSection from "../Components/CandidateHubDropdownSection";

const ElectioneeringSection = (): React.ReactElement => {
  return (
    <CandidateHubDropdownSection header="Electioneering Totals">
      <ElectioneeringTotals />
    </CandidateHubDropdownSection>
  );
};

export default ElectioneeringSection;
