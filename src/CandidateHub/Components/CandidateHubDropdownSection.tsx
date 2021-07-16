import React, { useContext } from "react";

import { AppContext } from "handsome-ui";

import DropdownSection, {
  Props as DropdownSectionProps,
} from "../../common/Components/DropdownSection";

type Props = Pick<DropdownSectionProps, "header" | "children">;

const CandidateHubDropdownSection = (props: Props): React.ReactElement => {
  const isMobile = useContext(AppContext);

  const { header, children } = props;

  return (
    <DropdownSection header={header} defaultOpen={!isMobile}>
      {children}
    </DropdownSection>
  );
};

export default CandidateHubDropdownSection;
