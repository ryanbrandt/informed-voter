import React, { useState, useEffect } from "react";

import { Modal } from "handsome-ui";

import { DATA_AUTHOR, PAGE_AUTHOR, PAGE_NAME } from "../constants";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CitationModal = (props: Props): React.ReactElement => {
  const [citationString, setCitationString] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const { location } = window;

    const newCitationString = `
      ${PAGE_AUTHOR}, ${DATA_AUTHOR}. ${PAGE_NAME}.
      ${new Date().toLocaleDateString()}. ${location}.
    `;

    setCitationString(newCitationString);
  }, []);

  const _onCopyCitation = async (): Promise<void> => {
    const { clipboard } = navigator;

    try {
      await clipboard.writeText(citationString || "");

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (e) {
      console.log(`Failed to copy citation ${e}`);
    }
  };

  const _renderCopyToClipboardText = (): React.ReactElement => {
    if (copied) {
      return <div className="citation_modal-copied-info">Copied!</div>;
    }

    return (
      <div className="citation_modal-copy-btn" onClick={_onCopyCitation}>
        Copy to Clipboard
      </div>
    );
  };

  const { open, onClose } = props;

  return (
    <Modal modalClassName="citation_modal" open={open} onClose={onClose}>
      <div className="citation_modal-container">
        {_renderCopyToClipboardText()}
        <div className="citation_modal-copy-container">{citationString}</div>
      </div>
    </Modal>
  );
};

export default CitationModal;
