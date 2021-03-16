import React from "react";

import CommunicationCosts from "../../CommunicationCosts/Components/CommunicationCosts";
import DropdownSection from "../../common/Components/DropdownSection";

const ElectioneeringSection = (): React.ReactElement => {
  return (
    <DropdownSection header="Communication Costs" defaultOpen>
      <CommunicationCosts />
    </DropdownSection>
  );
};

export default ElectioneeringSection;
