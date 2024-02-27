import { memo, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

const EndScrollDetector = ({ isShown, children, onReach }) => {
  const scrollEndScrollDetectorRef = useRef(null);

  useEffect(() => {
    if (!scrollEndScrollDetectorRef.current) {
      return undefined;
    }

    const scrollEndScrollDetectorEl = scrollEndScrollDetectorRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onReach();
      }
    });

    observer.observe(scrollEndScrollDetectorEl);

    return () => {
      observer.unobserve(scrollEndScrollDetectorEl);
    };
  }, [onReach]);

  return (
    <div ref={scrollEndScrollDetectorRef} className={twMerge("block h-fit w-full", !isShown && "hidden")}>
      {children}
    </div>
  );
};

export default memo(EndScrollDetector);
