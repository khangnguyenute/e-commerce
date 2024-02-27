import { includes } from "lodash";
import { Children, cloneElement, useCallback, useLayoutEffect, useMemo } from "react";
import { BiChevronRight } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useSelector } from "react-redux";

const LayoutSidebarGroup = ({ children, className, icon, id, sidebarId, isOpen = false, title, onOpen }) => {
  const isCollapsed = useSelector((state) => state.common.isCollapsed);

  const forceIsOpen = useMemo(() => {
    if (isCollapsed) {
      return false;
    }

    return isOpen;
  }, [isCollapsed, isOpen]);

  const childrenPath = useMemo(() => {
    const newChildren = Array.isArray(children) ? children : [children];

    return newChildren?.map((item) => {
      if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
        return item;
      }

      if (item && "props" in item && "to" in item.props) {
        return item.props.to;
      }

      return item;
    });
  }, [children]);

  const location = useLocation();

  const isIncludeChildrenPath = useMemo(
    () => includes(childrenPath, location.pathname),
    [childrenPath, location.pathname],
  );

  const handleOpenSidebarGroup = useCallback(
    (_, isChildSelected = false) => {
      onOpen?.(id, isChildSelected);
    },
    [id, onOpen],
  );

  useLayoutEffect(() => {
    if (isIncludeChildrenPath) {
      handleOpenSidebarGroup(null, true);
    }
  }, [handleOpenSidebarGroup, isIncludeChildrenPath]);

  return (
    <div
      className={twMerge(
        "group/group-label relative z-10 h-fit w-full pb-2 pt-3",
        forceIsOpen && "pb-0",
        isCollapsed &&
          "flex aspect-square cursor-pointer items-center justify-center rounded-md p-0 hover:bg-gray-200",
        isIncludeChildrenPath && isCollapsed && "bg-gray-200",
      )}
    >
      <div
        className={twMerge(
          "flex h-4 w-full items-center text-xs font-semibold text-gray-500 hover:text-primary-600",
          forceIsOpen && "mb-2",
          className,
          isCollapsed && "flex items-center justify-center",
          isCollapsed && isIncludeChildrenPath && "text-primary-600",
        )}
        role="button"
        tabIndex={0}
        onClick={handleOpenSidebarGroup}
      >
        {!isCollapsed && (
          <div className="flex items-center">
            <div>
              <BiChevronRight
                size={16}
                className={twMerge("-ml-0.5 mr-[3px] text-sm duration-200", forceIsOpen && "rotate-90")}
              />
            </div>
            <div className="ml-2 line-clamp-1 break-all uppercase">{title}</div>
          </div>
        )}
        {isCollapsed &&
          cloneElement(icon, {
            size: 20,
            className: "group-hover/group-label:text-primary-600",
          })}
      </div>
      {forceIsOpen && Children.map(children, (child) => cloneElement(child, { sidebarId, ...child?.props }))}
      {isCollapsed && (
        <div className="absolute left-14 top-0 hidden group-hover/group-label:block">
          <div className="absolute -left-6 h-16 w-14 bg-transparent" />
          <div className="h-fit w-fit min-w-48 overflow-hidden rounded-lg border-2 border-gray-100 bg-gray-50 shadow">
            <div className="whitespace-nowrap bg-gray-100 px-6 py-2 text-sm font-semibold">{title}</div>
            <div className="px-2 py-2">
              {Children.map(children, (child) =>
                cloneElement(child, {
                  ...child?.props,
                  isChild: true,
                  sidebarId,
                }),
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutSidebarGroup;
