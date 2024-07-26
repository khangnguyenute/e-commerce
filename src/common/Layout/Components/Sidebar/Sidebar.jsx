import { Children, cloneElement, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { useTimeout } from "usehooks-ts";

import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@slices/commonSlice";

const LayoutSidebar = ({
  children,
  className,
  containerClassName,
  defaultOpeningGroups,
  id: sidebarId,
  isDisabledCollapse = false,
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.common.isCollapsed);

  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [openingGroudIds, setOpeningGroudIds] = useState(defaultOpeningGroups || []);
  const [visibleFooterHeight, setVisibleFooterHeight] = useState(0);

  const containerCollapsedClassName = useMemo(() => {
    if (!isCollapsed) {
      return "";
    }

    return "w-14";
  }, [isCollapsed]);

  const footerElement = useMemo(() => {
    const element = document.querySelector("#footer");

    if (element) {
      return element;
    }

    return null;
  }, []);

  const handleDocumentScroll = useCallback(() => {
    if (!footerElement) {
      setVisibleFooterHeight(0);
      return;
    }

    const { top } = footerElement.getBoundingClientRect();

    if (top === 0) {
      setVisibleFooterHeight(0);
      return;
    }

    setVisibleFooterHeight(Math.max(0, window.innerHeight - top));
  }, [footerElement]);

  const handleClickCollapse = useCallback(() => {
    if (isDisabledCollapse) return;
    dispatch(toggleSidebar());
  }, [dispatch, isDisabledCollapse]);

  const handleHoverSidebar = useCallback(() => {
    setIsHoveringSidebar(true);
  }, []);

  const handleLeaveSidebar = useCallback(() => {
    setIsHoveringSidebar(false);
  }, []);

  const handleOpenSidebarGroup = useCallback((id, isChildSelected = true) => {
    setOpeningGroudIds((prev) => {
      if (isChildSelected) {
        return [id];
      }

      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [id];
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScroll);

    return () => {
      window.removeEventListener("scroll", handleDocumentScroll);
    };
  }, [handleDocumentScroll]);

  useTimeout(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.transitionDuration = "100ms";
  }, 1000);

  return (
    <div
      className={twMerge(
        "fixed bottom-0 left-0 top-0 z-40 border-r-2 border-gray-100 bg-gray-100 pt-20",
        className,
      )}
      style={{ height: `calc(100vh - ${visibleFooterHeight}px)` }}
      onMouseEnter={handleHoverSidebar}
      onMouseLeave={handleLeaveSidebar}
    >
      <div
        className={twMerge("group/sidebar relative h-full w-72 bg-gray-100", containerCollapsedClassName)}
        ref={ref}
      >
        <div
          className={twMerge(
            "h-full w-full px-4 py-5 scrollbar-none hover:overflow-clip hover:overflow-y-auto",
            containerClassName,
            isCollapsed && "overflow-visible px-2 hover:overflow-visible",
          )}
        >
          {children &&
            Children?.map(children, (child) =>
              cloneElement(child, {
                ...child?.props,
                key: child?.props?.id,
                isOpen: openingGroudIds.includes(child?.props.id),
                sidebarId,
                onOpen: handleOpenSidebarGroup,
              }),
            )}
        </div>
        <div
          className={twMerge(
            "absolute -right-3.5 top-26.5 z-10 flex h-7 w-7 cursor-pointer select-none items-center justify-center rounded-full border-2 border-gray-100 bg-white opacity-0 shadow-lg hover:bg-gray-50",
            isHoveringSidebar && "opacity-100",
            isDisabledCollapse && "hidden opacity-0",
          )}
          role="button"
          tabIndex={0}
          onClick={handleClickCollapse}
        >
          <BiChevronLeft
            className={twMerge("text-slate-500 duration-200", isCollapsed && "rotate-180")}
            size={18}
          />
        </div>
      </div>
    </div>
  );
};
export default memo(LayoutSidebar);
