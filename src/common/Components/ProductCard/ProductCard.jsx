import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { lowerCase } from "lodash";
import { beautifyNumber } from "../Utils";
import { CLIENT_PATH } from "@constants/routeConstant";
import { memo, useCallback } from "react";
import { BiSolidDiscount } from "react-icons/bi";

const ProductCard = ({ data, className }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(CLIENT_PATH.PRODUCT_DETAIL(lowerCase(data.category), data._id));
  }, [data._id, data.category, navigate]);

  return (
    <div
      role="button"
      tabIndex={0}
      className={twMerge(
        "group relative grid grid-cols-2 items-center overflow-hidden rounded-xl border-t-8 border-gray-100 bg-white p-2 text-sm shadow-base duration-300 hover:border-t-primary-500 xs:text-base sm:p-4",
        className,
      )}
      onClick={handleClick}
    >
      {data.tag && (
        <p className="absolute -right-12 top-5 z-10 w-fit rotate-45 scale-90 bg-primary-500 px-12 py-1 text-center text-xs uppercase text-white duration-200 group-hover:scale-100 xs:text-sm sm:scale-90">
          SIÊU SALE
        </p>
      )}
      <div className="relative mb-4 mt-2 flex h-2/3 w-auto items-center justify-center overflow-hidden duration-300 group-hover:scale-105 xs:h-2/5">
        <img src={data.image} alt={data.name} className="h-full w-auto object-contain"></img>
        {data.promotion && (
          <div
            className={twMerge(
              "scale-80 absolute left-0 top-2 z-10 w-fit rounded-md bg-tag px-1 py-0 text-white sm:px-2 sm:py-1 md:scale-100",
              data.promotion === "" && "invisible",
            )}
          >
            <p className="text-xxs xs:text-xs">{data.promotion}</p>
          </div>
        )}
      </div>
      <div>
        <p className="mb-2 line-clamp-2 font-semibold duration-300 group-hover:text-blue-700">{data.name}</p>
        <p className="text-xs xs:text-sm">
          <BiSolidDiscount className="mr-1 inline" /> Giá luôn rẻ
        </p>
        <p className="mb-1 font-medium text-slate-700">
          <span className="mr-2 font-bold text-primary-500">
            {beautifyNumber(data?.price * (1 - data?.discount))}
          </span>
          {Boolean(data?.discount) && <span>-{data?.discount * 100}%</span>}
        </p>
        <div className="flex items-center space-x-2 font-bold text-yellow-400">
          <div>{data?.star.toFixed(1)}</div>
          <AiFillStar />
          <span className="font-normal text-gray-700">({data?.totalVote})</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
