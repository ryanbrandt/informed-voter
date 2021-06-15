import React from "react";

import { Column, Dropdown, Row } from "handsome-ui";

import { SearchResults } from "../types";
import { history } from "../../routes";

interface Props {
  candidate: SearchResults;
}

const CandidateContent = (props: Props): React.ReactElement => {
  const { candidate } = props;

  const _renderHeading = (): React.ReactNode => {
    const { name, office } = candidate;

    return (
      <div className="candidate_search-content-header">
        {name} for {office}
      </div>
    );
  };

  const onSeeFullData = (): void => {
    const { id } = candidate;

    history.push(`/candidate-hub/${id}`);
  };

  const { state, district, office, party } = candidate;

  return (
    <Dropdown heading={_renderHeading()}>
      <div className="candidate_search-content-container">
        <Row version="space-between" className="candidate_search-content-row">
          <Column>
            <div>
              <h3>State</h3>
              {state}
            </div>
            <div>
              <h3>District</h3>
              {district}
            </div>
          </Column>
          <Column>
            <div>
              <h3>Office</h3>
              {office}
            </div>
            <div>
              <h3>Party</h3>
              {party}
            </div>
          </Column>
        </Row>
        <div onClick={onSeeFullData} className="candidate_search-full-btn">
          View Full Data
        </div>
      </div>
    </Dropdown>
  );
};

export default CandidateContent;
