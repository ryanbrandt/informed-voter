import React from "react";

import { Dropdown } from "handsome-ui";

interface Props {
  children: React.ReactChildren | React.ReactChild;
  header: string;
}

const DropdownSection = (props: Props): React.ReactElement => {
  const { children, header } = props;

  const _renderHeader = (): React.ReactNode => {
    return <div className="dropdown_section-header">{header}</div>;
  };

  return (
    <div className="dropdown_section-container">
      <Dropdown heading={_renderHeader()}>{children}</Dropdown>
    </div>
  );
};

export default DropdownSection;
