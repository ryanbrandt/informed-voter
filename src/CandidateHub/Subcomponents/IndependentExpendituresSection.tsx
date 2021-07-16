import React from "react";

import IndependentExpendituresTotals from "../../IndepdentExpenditures/Components/IndependentExpendituresTotals";
import CandidateHubDropdownSection from "../Components/CandidateHubDropdownSection";

const ElectioneeringSection = (): React.ReactElement => {
  return (
    <CandidateHubDropdownSection header="Independent Expenditures Totals">
      <IndependentExpendituresTotals />
    </CandidateHubDropdownSection>
  );
};

export default ElectioneeringSection;
