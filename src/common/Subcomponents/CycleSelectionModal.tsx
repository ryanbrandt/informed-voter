import React from "react";

import { Modal } from "handsome-ui";

interface Props {
  cycles: Array<number>;
  activeCycle: number;
  onChange: (cycle: number) => void;
  open: boolean;
  onClose: () => void;
}

const CycleSelectionModal: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  const { onClose } = props;

  const _onCycleSelection = (cycle: number): void => {
    const { onChange } = props;

    onChange(cycle);
    onClose();
  };

  const _renderCycle = (cycle: number): React.ReactNode => {
    const { activeCycle } = props;

    let activeModifer = "";
    if (cycle === activeCycle) {
      activeModifer = "-active";
    }

    return (
      <div
        key={cycle}
        className={`cycle_selector-modal-cycle${activeModifer}`}
        onClick={() => _onCycleSelection(cycle)}
      >
        {cycle}
      </div>
    );
  };

  const { cycles, open } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="cycle_selector-modal-content">
        {cycles.map((cycle) => _renderCycle(cycle))}
      </div>
    </Modal>
  );
};

export default CycleSelectionModal;
