import { memo, useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed bottom-4 right-4 z-20 rounded-full border-2 border-blue-500 p-1"
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp className="text-blue-500" size={24} />
    </div>
  );
};

export default memo(ScrollToTop);
