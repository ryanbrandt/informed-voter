import React from "react";

import ElectioneeringTotals from "../../Electioneering/Components/ElectioneeringTotals";
import DropdownSection from "../../common/Components/DropdownSection";

const ElectioneeringSection = (): React.ReactElement => {
  return (
    <DropdownSection header="Electioneering Totals" defaultOpen>
      <ElectioneeringTotals />
    </DropdownSection>
  );
};

export default ElectioneeringSection;
