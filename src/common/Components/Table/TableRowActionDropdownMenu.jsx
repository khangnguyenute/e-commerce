import { memo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import TableRowActionDropdownMenuItem from "./TableRowActionDropdownMenuItem";

const TableRowActionDropdownMenu = ({ id, items, parentRef, className }) => {
  const menuRef = useRef(null);
  const dropdownContainer = window.document.querySelector(".kpshop-dropdown-container");

  const setDropdownPosition = useCallback(() => {
    const parentElement = parentRef.current;
    const menuElement = menuRef.current;
    if (!parentElement || !menuElement) return;
    const parentElementRect = parentElement.getBoundingClientRect();
    menuElement.style.top = `${parentElementRect.top + parentElementRect.height + 8}px`;
    menuElement.style.right = `${window.innerWidth - parentElementRect.right - 16}px`;
  }, [parentRef]);

  useEffect(() => {
    setDropdownPosition();

    window.addEventListener("scroll", setDropdownPosition);
    window.addEventListener("resize", setDropdownPosition);

    return () => {
      window.removeEventListener("scroll", setDropdownPosition);
      window.removeEventListener("resize", setDropdownPosition);
    };
  }, [setDropdownPosition]);

  return createPortal(
    <div
      ref={menuRef}
      className={twMerge(
        "fixed z-10 flex w-40 flex-col rounded-lg border-2 border-gray-100 bg-white py-3 text-slate-700 shadow-lg shadow-gray-100",
        className,
      )}
    >
      {items.map((item) => (
        <TableRowActionDropdownMenuItem key={item.key} id={id} item={item} />
      ))}
    </div>,
    dropdownContainer,
  );
};

export default memo(TableRowActionDropdownMenu);
