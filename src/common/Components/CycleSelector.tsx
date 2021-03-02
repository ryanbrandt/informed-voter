import React, { Fragment, useState } from "react";

import { Button, Chevron } from "handsome-ui";
import CycleSelectionModal from "../Subcomponents/CycleSelectionModal";

interface Props {
  cycles: Array<number>;
  activeCycle: number;
  onChange: (cycle: number) => void;
}

const CycleSelector: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement | null => {
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);

  const { cycles } = props;

  if (cycles.length > 0) {
    const { activeCycle, onChange } = props;

    return (
      <Fragment>
        <div className="cycle_selector-container">
          <Button
            className="app-opacity-in"
            title={activeCycle.toString()}
            icon={<Chevron width={12} height={12} />}
            onClick={() => setSelectionModalOpen(true)}
          />
        </div>
        <CycleSelectionModal
          open={selectionModalOpen}
          onClose={() => setSelectionModalOpen(false)}
          cycles={cycles}
          activeCycle={activeCycle}
          onChange={onChange}
        />
      </Fragment>
    );
  }

  return null;
};

export default CycleSelector;
