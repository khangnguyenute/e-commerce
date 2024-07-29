import { Children, memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import LayoutContentWrapperBody from "./ContentWrapperBody";
import LayoutContentWrapperHeader from "./ContentWrapperHeader";
import LayoutContentWrapperTab from "./ContentWrapperTab";
import useDocumentTitle from "@hooks/useDocumentTitle";

const LayoutContentWrapper = ({
  actions,
  activatedTab,
  activeTabItemClassName,
  className,
  bodyClassName,
  headerClassName,
  children,
  isBlank,
  isBorder,
  isShowHeader = true,
  tabClassName,
  tabItemClassName,
  tabHeader,
  tabs,
  tabStyle,
  title,
  tabAction,
  onChangeTab,
}) => {
  const activatedTabIndex = useMemo(
    () => tabs?.findIndex((tab) => tab.id === activatedTab) ?? 0,
    [activatedTab, tabs],
  );

  const childTabElement = useMemo(
    () => Children.toArray(children)[activatedTabIndex] ?? null,
    [activatedTabIndex, children],
  );

  useDocumentTitle(title, isShowHeader);

  return (
    <div className={twMerge("section__container", className)}>
      {(title || actions) && isShowHeader && (
        <LayoutContentWrapperHeader className={headerClassName} title={title} actions={actions} />
      )}
      <div className="relative">
        {tabs && (
          <LayoutContentWrapperTab
            activatedTab={activatedTab}
            activeTabItemClassName={activeTabItemClassName}
            className={tabClassName}
            itemClassName={tabItemClassName}
            tabStyle={tabStyle}
            tabs={tabs}
            onChange={onChangeTab}
          />
        )}
        {tabAction}
      </div>

      <LayoutContentWrapperBody
        className={bodyClassName}
        isBlank={isBlank}
        isBorder={isBorder}
        isTab={Boolean(tabs?.length)}
      >
        <div>
          {tabHeader}
          {!tabs?.length || !childTabElement ? children : childTabElement}
        </div>
      </LayoutContentWrapperBody>
    </div>
  );
};

export default memo(LayoutContentWrapper);
