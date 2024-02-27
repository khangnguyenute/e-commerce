import { cloneElement, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { useOnClickOutside } from "usehooks-ts";
import { getTwScreenWidth } from "../Utils";

const DropdownMenu = ({
  className,
  isHideOnClick,
  isShow = false,
  isForceRender = false,
  isRenderOnParent = false,
  menu,
  parentRef,
  position = "right",
  calculatePosition,
  onHide,
  onClickOutside,
}) => {
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownContainer = useMemo(() => window.document.querySelector(".kpshop-dropdown-container"), []);
  const portalElement = useMemo(() => {
    if (!isRenderOnParent || !parentRef.current) return dropdownContainer ?? document.body;

    return parentRef.current;
  }, [dropdownContainer, isRenderOnParent, parentRef]);

  const setDropdownPosition = useCallback(() => {
    const parentElement = parentRef.current;
    const dropdownElement = dropdownRef.current;
    const space = 8;

    if (!parentElement || !dropdownElement) return;

    const parentElementRect = parentElement.getBoundingClientRect();
    const rootWidth = window.document.documentElement.clientWidth;
    const startCalculatePosition = getTwScreenWidth("lg");
    const controlledRect = calculatePosition?.(parentElement, dropdownElement);

    if (controlledRect) {
      const { top, left, right, bottom, height, width } = controlledRect;

      if (top) dropdownElement.style.top = `${top}px`;
      if (left) dropdownElement.style.left = `${left}px`;
      if (right) dropdownElement.style.right = `${right}px`;
      if (bottom !== null && bottom !== undefined) dropdownElement.style.bottom = `${bottom}px`;
      if (height) dropdownElement.style.height = `${height}px`;
      if (width) dropdownElement.style.width = `${width}px`;

      if (top !== undefined && top !== null && bottom !== undefined && bottom !== null) {
        return;
      }
    }

    if (window.innerHeight - parentElementRect.bottom - space > dropdownElement.offsetHeight) {
      dropdownElement.style.top = `${parentElementRect.top + parentElementRect.height + space}px`;
      dropdownElement.style.justifyContent = "start";
    } else {
      dropdownElement.style.top = `${parentElementRect.top - dropdownElement.offsetHeight - space}px`;
      dropdownElement.style.justifyContent = "end";
    }

    if (rootWidth < startCalculatePosition && dropdownElement.offsetWidth + space * 2 >= rootWidth) {
      dropdownElement.style.left = `${space}px`;
      dropdownElement.style.right = `${space}px`;
      dropdownElement.style.width = `${rootWidth - space * 2}px`;
      return;
    }

    if (position === "center") {
      if (rootWidth - parentElementRect.right < (dropdownElement.offsetWidth - parentElementRect.width) / 2) {
        dropdownElement.style.right = `0px`;
        return;
      }
      if (parentElementRect.left < (dropdownElement.offsetWidth - parentElementRect.width) / 2) {
        dropdownElement.style.left = `0px`;
        return;
      }

      dropdownElement.style.left = `${
        parentElementRect.right - (dropdownElement.offsetWidth + parentElementRect.width) / 2
      }px`;
      return;
    }

    if (position === "left") {
      if (rootWidth - parentElementRect.left > dropdownElement.offsetWidth) {
        dropdownElement.style.left = `${-parentElementRect.left - space / 2}px`;
        return;
      }
      dropdownElement.style.right = `${rootWidth - parentElementRect.right}px`;
      return;
    }

    if (parentElementRect.left >= dropdownElement.offsetWidth) {
      dropdownElement.style.right = `${rootWidth - parentElementRect.right}px`;
      return;
    }

    dropdownElement.style.left = `${parentElementRect.left - space / 2}px`;
  }, [calculatePosition, parentRef, position]);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (isHideOnClick !== false) {
        onHide();
      }
    },
    [isHideOnClick, onHide],
  );

  useEffect(() => {
    setDropdownPosition();
  }, [setDropdownPosition, isShow]);

  useEffect(() => {
    setDropdownPosition();

    window.addEventListener("resize", setDropdownPosition);
    window.addEventListener("scroll", setDropdownPosition);

    return () => {
      window.removeEventListener("resize", setDropdownPosition);
      window.removeEventListener("scroll", setDropdownPosition);
    };
  }, [setDropdownPosition]);

  useOnClickOutside(menuRef, onClickOutside);

  if (!isShow && !isForceRender) {
    return null;
  }

  return createPortal(
    <div
      ref={dropdownRef}
      className={twMerge(
        "duration fixed z-50 hidden w-48 rounded-lg border-t-2 border-gray-100 bg-white p-4 text-slate-700 shadow-lg transition ease-linear",
        isShow && "block",
        className,
      )}
    >
      <div
        role="button"
        tabIndex={-1}
        className="no-click-flicking h-full"
        ref={menuRef}
        onClick={handleClick}
      >
        {cloneElement(menu, { onHide })}
      </div>
    </div>,
    portalElement,
  );
};

export default memo(DropdownMenu);
