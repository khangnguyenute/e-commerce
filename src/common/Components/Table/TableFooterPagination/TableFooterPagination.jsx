import { getTwScreenWidth } from "@utils/Helpers";
import { memo, useCallback, useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ReactPaginate from "react-paginate";

const TableFooterPagination = ({ pageIndex, totalPages = 1, onChangePageIndex }) => {
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);

  const handlePageClick = useCallback(
    (selectedItem) => {
      onChangePageIndex(selectedItem.selected);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [onChangePageIndex],
  );

  const calculuateWidth = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth >= getTwScreenWidth("lg")) {
      setPageRangeDisplayed(2);
    }
    if (windowWidth >= getTwScreenWidth("md")) {
      setPageRangeDisplayed(2);
    } else {
      setPageRangeDisplayed(1);
    }
  }, []);

  useEffect(() => {
    calculuateWidth();

    window.addEventListener("resize", calculuateWidth);

    return () => {
      window.addEventListener("resize", calculuateWidth);
    };
  }, [calculuateWidth]);

  return (
    <nav className="relative z-10 inline-flex cursor-pointer rounded-md text-sm font-medium shadow-sm">
      <ReactPaginate
        breakLabel="..."
        breakLinkClassName="border border-gray-100 px-3 py-2 lg:px-4 lg:py-2.5 hover:bg-gray-50"
        nextLabel={
          <div className="rounded-r-md border border-gray-100 bg-white p-1.5 text-gray-500 hover:bg-gray-50 lg:p-2">
            <BiChevronRight size={21} />
          </div>
        }
        previousLabel={
          <div className="rounded-l-md border border-gray-100 bg-white p-1.5 text-gray-500 hover:bg-gray-50 lg:p-2">
            <BiChevronLeft size={21} />
          </div>
        }
        containerClassName="inline-flex items-center"
        pageLinkClassName="border border-gray-100 px-3 py-2 lg:px-4 lg:py-2.5 h-full hover:bg-gray-50"
        activeLinkClassName="border-primary-700 bg-primary-50 text-primary-700 hover:bg-primary-50"
        onPageChange={handlePageClick}
        {...(!pageIndex && { forcePage: pageIndex })}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={pageRangeDisplayed}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
      />
    </nav>
  );
};

export default memo(TableFooterPagination);
