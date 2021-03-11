import React from "react";

import { Dropdown } from "handsome-ui";

interface Props {
  children: React.ReactChildren | React.ReactChild;
  header: string;
  defaultOpen?: boolean;
}

const DropdownSection = (props: Props): React.ReactElement => {
  const { children, header, defaultOpen } = props;

  const _renderHeader = (): React.ReactNode => {
    return <div className="dropdown_section-header">{header}</div>;
  };

  return (
    <div className="dropdown_section-container">
      <Dropdown heading={_renderHeader()} defaultOpen={defaultOpen}>
        {children}
      </Dropdown>
    </div>
  );
};

export default DropdownSection;
