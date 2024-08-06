import { cloneElement, memo, useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const LayoutContentWrapperTabItem = ({
  activeClassName,
  className,
  id,
  isActive,
  title,
  onChange,
  onActive,
}) => {
  const ref = useRef(null);

  const handleSelect = useCallback(() => {
    onChange(id);
  }, [id, onChange]);

  // Scroll to the center of the container when the tab is active
  const scrollToCenter = useCallback(() => {
    if (!isActive || !ref.current) {
      return;
    }

    const element = ref.current;
    const containerElement = element.parentElement;

    if (!containerElement) {
      return;
    }

    const { width } = element.getBoundingClientRect();
    const { offsetLeft: left } = element;
    const { offsetLeft: containerLeft, offsetWidth: containerWidth } = containerElement;

    containerElement.scrollTo({
      left: left - containerLeft - (containerWidth - width) / 2,
      behavior: "smooth",
    });
  }, [isActive]);

  useEffect(() => {
    scrollToCenter();
  }, [scrollToCenter]);

  useEffect(() => {
    if (!isActive || !ref.current) {
      return;
    }

    onActive(ref.current);
  }, [isActive, onActive]);

  return (
    <div
      className={twMerge(
        "relative flex-shrink-0 cursor-pointer border-b-2 border-transparent font-medium duration-300 hover:border-primary-500 hover:text-primary-500",
        isActive && "border-primary-500 text-primary-500",
        className,
        isActive && activeClassName,
      )}
      role="button"
      ref={ref}
      tabIndex={0}
      onClick={handleSelect}
    >
      {title && typeof title === "object" && "props" in title ? cloneElement(title, { isActive }) : title}
      {isActive && <span className="absolute inset-x-6 -bottom-0.5 border-t-2 border-transparent" />}
    </div>
  );
};

export default memo(LayoutContentWrapperTabItem);
