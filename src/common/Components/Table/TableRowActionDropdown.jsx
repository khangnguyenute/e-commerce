import { memo, useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";

import TableRowActionDropdownMenu from "./TableRowActionDropdownMenu";

const TableRowActionDropdown = ({ id, items, className }) => {
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);
  const toggleButtonRef = useRef < HTMLDivElement > null;

  const handleClickToggleButton = () => {
    setIsShowDropdownMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!toggleButtonRef.current) {
      return undefined;
    }
    const toggleButtonElement = toggleButtonRef.current;
    const handleClickOutside = (event) => {
      if (toggleButtonElement.contains(event.target)) {
        return;
      }
      setIsShowDropdownMenu(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={toggleButtonRef}>
      <div
        className="w-fit cursor-pointer rounded-lg bg-gray-100 p-2 duration-200 hover:bg-gray-200"
        role="button"
        tabIndex={0}
        onClick={handleClickToggleButton}
      >
        <HiMenu />
      </div>
      {isShowDropdownMenu && (
        <TableRowActionDropdownMenu parentRef={toggleButtonRef} id={id} items={items} className={className} />
      )}
    </div>
  );
};

export default memo(TableRowActionDropdown);
