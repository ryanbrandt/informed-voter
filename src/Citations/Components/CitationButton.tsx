import React, { Fragment } from "react";

import { Button } from "handsome-ui";

interface Props {}

const CitationButton = (props: Props) => {
  return (
    <Fragment>
      <Button title="Cite This Page" onClick={() => null} />
    </Fragment>
  );
};

export default CitationButton;
