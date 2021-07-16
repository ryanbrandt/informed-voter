import React from "react";

import CommunicationCosts from "../../CommunicationCosts/Components/CommunicationCosts";
import CandidateHubDropdownSection from "../Components/CandidateHubDropdownSection";

const ElectioneeringSection = (): React.ReactElement => {
  return (
    <CandidateHubDropdownSection header="Communication Costs">
      <CommunicationCosts />
    </CandidateHubDropdownSection>
  );
};

export default ElectioneeringSection;
