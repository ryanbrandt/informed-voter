import React from "react";
import { connect } from "react-redux";

import { Table, TableRow, TableCell } from "handsome-ui";

import CandidateContent from "../Subcomponents/CandidateContent";
import { SearchResults } from "../types";
import { RootState } from "../../store/rootReducer";
import { getCandidates } from "../selectors";
import EmptySearchResults from "../Subcomponents/EmptySearchResults";
import CandidateSearchPagination from "../Subcomponents/CandidateSearchPagination";

interface StateProps {
  candidates: SearchResults[];
}

const CandidateTable = (props: StateProps): React.ReactElement | null => {
  const { candidates } = props;

  if (candidates.length > 0) {
    return (
      <React.Fragment>
        <CandidateSearchPagination />
        <Table className="candidate_search-table" headers={["Candidate"]}>
          {candidates.map((candidate, i) => (
            <TableRow key={`${candidate.name}_${i}`} darkened={i % 2 === 0}>
              <TableCell className="candidate_search-table-cell">
                <CandidateContent candidate={candidate} />
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <CandidateSearchPagination />
      </React.Fragment>
    );
  }

  return <EmptySearchResults />;
};

const mapStateToProps = (state: RootState): StateProps => ({
  candidates: getCandidates(state),
});

export default connect<StateProps, void, {}, RootState>(mapStateToProps)(
  CandidateTable
);
