import { memo } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const HomeScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300"
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp size={24} />
    </div>
  );
};

export default memo(HomeScrollToTop);
