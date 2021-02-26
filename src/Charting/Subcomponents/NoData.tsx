import React from "react";

import { EmptyBox } from "handsome-ui";

const NoData = (): React.ReactElement => {
  return (
    <div className="chart_no-data">
      <div className="chart_no-data-content">There's no FEC data on this</div>
      <EmptyBox className="app_informed-dimmed" width={150} height={150} />
    </div>
  );
};

export default NoData;
