import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { getTwScreenWidth } from "@utils/Helpers";

const LayoutContainer = ({ children, sidebar, excludeSidebarPaths }) => {
  const { pathname } = useLocation();
  const isCollapsed = useSelector((state) => state.common.isCollapsed);

  const containerRef = useRef(null);

  const isMatchExcludeSidebarPaths = useMemo(
    () => excludeSidebarPaths?.some((path) => matchPath(path, pathname)),
    [excludeSidebarPaths, pathname],
  );

  const calculateMarginLeft = useCallback(() => {
    const windowWidth = window.document.body.clientWidth;
    let marginLeft = 0;

    if (!containerRef.current) {
      return;
    }

    if (windowWidth < getTwScreenWidth("md")) {
      marginLeft = 0;
    } else {
      marginLeft += isCollapsed ? 58 : 290;
    }

    containerRef.current.style.marginLeft = `${marginLeft}px`;
  }, [isCollapsed]);

  useEffect(() => {
    calculateMarginLeft();

    window.addEventListener("resize", calculateMarginLeft);

    return () => {
      window.removeEventListener("resize", calculateMarginLeft);
    };
  }, [calculateMarginLeft]);

  return (
    <>
      {!isMatchExcludeSidebarPaths && sidebar}
      <div
        className={twMerge(
          "flex flex-col bg-gray-50 md:min-h-fit-layout",
          isMatchExcludeSidebarPaths && "md:ml-0",
        )}
        ref={containerRef}
      >
        {children}
      </div>
    </>
  );
};

export default memo(LayoutContainer);
