import { debounce } from "lodash";
import { memo, useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import ContentWrapperTabItem from "./ContentWrapperTabItem";

const LayoutContentWrapperTab = ({
  activatedTab,
  activeTabItemClassName,
  className,
  itemClassName,
  tabs,
  onChange,
}) => {
  const containerRef = useRef(null);
  const activeBarRef = useRef(null);

  const handleActiveTab = useCallback((tabElement) => {
    const activeBarElement = activeBarRef.current;

    if (!tabElement || !activeBarElement) {
      return;
    }

    const { width } = tabElement.getBoundingClientRect();
    const { offsetLeft } = tabElement;

    activeBarElement.style.width = `${width - 52}px`;
    activeBarElement.style.left = `${offsetLeft + 26}px`;
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleActiveTabDebounced = useCallback(debounce(handleActiveTab, 50), [handleActiveTab]);

  const handleOverflowX = useCallback(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    const isOverflowX = containerElement.scrollWidth > containerElement.clientWidth;

    if (isOverflowX) {
      containerElement.classList.remove("justify-center");
      containerElement.classList.add("justify-start");
    }
  }, []);

  useEffect(() => {
    handleOverflowX();
  }, [handleOverflowX, tabs]);

  return (
    <div
      className={twMerge(
        "relative z-10 flex flex-wrap items-center justify-center gap-4 rounded-t-lg sm:gap-6",
        className,
      )}
      ref={containerRef}
    >
      {tabs.map((tab) => (
        <ContentWrapperTabItem
          activeClassName={activeTabItemClassName}
          className={itemClassName}
          id={tab.id}
          isActive={activatedTab === tab.id}
          key={tab.id}
          title={tab.title}
          onChange={onChange}
          onActive={handleActiveTabDebounced}
        />
      ))}
    </div>
  );
};

export default memo(LayoutContentWrapperTab);
