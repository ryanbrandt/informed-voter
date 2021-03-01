import React from "react";

interface Props {
  description: string;
  children: React.ReactNode;
}

const SectionContainer = (props: Props): React.ReactElement => {
  const { description, children } = props;

  return (
    <div className="section_container-container">
      <div className="section_container-description">{description}</div>
      {children}
    </div>
  );
};

export default SectionContainer;
