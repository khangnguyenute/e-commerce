import { useEffect } from "react";

const useDocumentTitle = (title, isScrollToTop = true) => {
  useEffect(() => {
    if (typeof title !== "string" || !isScrollToTop) {
      return;
    }

    window.document.title = `${title} | KPShop`;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isScrollToTop, title]);
};

export default useDocumentTitle;
