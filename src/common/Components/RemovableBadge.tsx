import React from "react";

import { Badge } from "handsome-ui";

interface Props {
  onRemove: () => void;
  content: string | React.ReactElement;
  className?: string;
}

const RemovableBadge: React.FunctionComponent<Props> = (
  props: Props
): React.ReactElement => {
  const _renderBadgeContent = (): React.ReactElement => {
    const { content, onRemove } = props;

    return (
      <div>
        {content}
        <span onClick={onRemove} className="removable_badge-remove-btn">
          X
        </span>
      </div>
    );
  };

  const { className } = props;

  return <Badge className={className} content={_renderBadgeContent()} />;
};

export default RemovableBadge;
