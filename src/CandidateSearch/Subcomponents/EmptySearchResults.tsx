import React from "react";

import { EmptyBox } from "handsome-ui";

const EmptySearchResults: React.FunctionComponent<{}> = () => {
  return (
    <div className="candidate_search-empty-results">
      <EmptyBox width={125} height={125} />
      <p>Theres nothing here. Refine your search results and try again?</p>
    </div>
  );
};

export default EmptySearchResults;
