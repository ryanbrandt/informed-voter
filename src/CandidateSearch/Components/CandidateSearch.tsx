import React from "react";

import { Button } from "handsome-ui";

import CandidateSearchInput from "../Subcomponents/CandidateSearchInput";

import CandidateSearchSelections from "../Subcomponents/CandidateSearchSelections";
import CandidateSearchStatus from "../Subcomponents/CandidateSearchStatus";

const CandidateSearch = (): React.ReactElement => {
  return (
    <div className="candidate_search-container">
      <h1>Search Candidates</h1>
      <CandidateSearchInput />
      <CandidateSearchSelections />
      <Button
        className="candidate_search-submit-btn"
        title="Search Candidates"
        onClick={() => null}
        inverting
      />
      <CandidateSearchStatus />
    </div>
  );
};

export default CandidateSearch;
