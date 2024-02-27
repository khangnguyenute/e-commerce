import { memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

const LinkGroup = ({
  name,
  children,
  id,
  selectedGroupId,
  onClickShowChildren,
}) => {
  const handleClickShowChildren = useCallback(() => {
    onClickShowChildren(id);
  }, [id, onClickShowChildren]);

  const isShowChildren = useMemo(() => {
    if (id === selectedGroupId) return true;
    return false;
  }, [id, selectedGroupId]);

  return (
    <div className="mb-2 h-fit w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={handleClickShowChildren}
        className={twMerge("h-fit w-full font-bold", isShowChildren && "mb-3")}
      >
        {name}
      </div>
      {isShowChildren && <div className="flex flex-col">{children}</div>}
    </div>
  );
};

export default memo(LinkGroup);
