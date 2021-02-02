import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Paging } from "handsome-ui";

import {
  getHasNextPage,
  getHasPrevPage,
  getCurrentPage,
  getTotalPages,
} from "../selectors";
import { nextPageRequest, prevPageRequest } from "../actions";
import { RootState } from "../../store/rootReducer";

interface StateProps {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
  pages: number;
}

interface DispatchProps {
  nextPage: () => void;
  prevPage: () => void;
}

const CandidateSearchPagination = (
  props: StateProps & DispatchProps
): React.ReactElement | null => {
  const { hasNext, hasPrev } = props;

  if (hasNext || hasPrev) {
    const { page, pages, nextPage, prevPage } = props;

    return (
      <div className="candidate_search-pagination-container">
        <Paging
          onNext={nextPage}
          onPrev={prevPage}
          page={page}
          totalPages={pages}
        />
      </div>
    );
  }

  return null;
};

const mapStateToProps = (state: RootState): StateProps => ({
  hasNext: getHasNextPage(state),
  hasPrev: getHasPrevPage(state),
  page: getCurrentPage(state),
  pages: getTotalPages(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  nextPage: () => dispatch(nextPageRequest()),
  prevPage: () => dispatch(prevPageRequest()),
});

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CandidateSearchPagination);
