import React from "react";

interface Props {
  children: React.ReactChild | React.ReactChildren;
}

const ChartContainer = (props: Props): React.ReactElement => {
  const { children } = props;

  return <div className="chart-container">{children}</div>;
};

export default ChartContainer;
