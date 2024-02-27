import { isFunction } from "lodash";
import { memo, useCallback } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const UncontrolledStarItem = ({ index, star, starClassName, disabled, onChange }) => {
  const handleChangeStar = useCallback(() => {
    if (disabled || !isFunction(onChange)) {
      return;
    }
    onChange(index + 1);
  }, [disabled, index, onChange]);

  return (
    <div role="button" tabIndex={0} onClick={handleChangeStar}>
      {index < star ? (
        <AiFillStar color="orange" className={starClassName} />
      ) : (
        <AiOutlineStar color="orange" className={starClassName} />
      )}
    </div>
  );
};

export default memo(UncontrolledStarItem);
