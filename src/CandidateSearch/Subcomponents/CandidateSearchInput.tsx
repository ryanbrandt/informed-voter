import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Input, Search } from "handsome-ui";

import { RootState } from "../../store/rootReducer";
import { getQuery } from "../selectors";
import { setQuery } from "../actions";

interface StateProps {
  value: string | null;
}

interface DispatchProps {
  onChange: (query: string) => void;
}

const CandidateSearchInput = (
  props: DispatchProps & StateProps
): React.ReactElement => {
  const { onChange, value } = props;

  return (
    <Input
      value={value || ""}
      type="search"
      onChange={(query: string) => onChange(query)}
      iconLeft={<Search width={15} height={15} />}
      placeholder="Search Candidates By Name"
      containerClassName="candidate_search-query-input"
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  value: getQuery(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange: (query: string) => dispatch(setQuery(query)),
});

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CandidateSearchInput);
