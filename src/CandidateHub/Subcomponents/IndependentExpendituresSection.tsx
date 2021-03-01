import React from "react";

import IndependentExpendituresTotals from "../../IndepdentExpenditures/Components/IndependentExpendituresTotals";
import DropdownSection from "../../common/Components/DropdownSection";

const ElectioneeringSection = (): React.ReactElement => {
  return (
    <DropdownSection header="Independent Expenditures Totals">
      <IndependentExpendituresTotals />
    </DropdownSection>
  );
};

export default ElectioneeringSection;
