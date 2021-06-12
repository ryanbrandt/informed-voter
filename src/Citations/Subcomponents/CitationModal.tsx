import React from "react";

import { Modal } from "handsome-ui";

import { DATA_AUTHOR, PAGE_AUTHOR, PAGE_NAME } from "../constants";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CitationModal = (props: Props): React.ReactElement => {
  const { open, onClose } = props;

  const _getCitationString = () => {
    const { location } = window;
    const { pathname } = location;

    return `
        ${PAGE_AUTHOR}, ${DATA_AUTHOR}. ${PAGE_NAME}. 
        ${new Date().toISOString()}. ${pathname}.
    `;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="citation_modal-container">
        <div className="citation_modal-copy-container">
          {_getCitationString()}
        </div>
      </div>
    </Modal>
  );
};

export default CitationModal;
