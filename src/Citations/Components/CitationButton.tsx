import React, { useState, Fragment } from "react";

import { Button } from "handsome-ui";

import CitationModal from "../Subcomponents/CitationModal";

const CitationButton = (): React.ReactElement => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <Button title="Cite This Page" onClick={() => setShowModal(true)} round />
      <CitationModal open={showModal} onClose={() => setShowModal(false)} />
    </Fragment>
  );
};

export default CitationButton;
