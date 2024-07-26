import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { lowerCase } from "lodash";
import { beautifyNumber } from "../Utils";
import { CLIENT_PATH } from "@constants/routeConstant";
import { useCallback } from "react";
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
        "group relative min-h-88 overflow-hidden rounded-xl border-t-8 border-gray-100 bg-white p-4 shadow-base duration-300 hover:border-t-primary-500",
        className,
      )}
      onClick={handleClick}
    >
      {data.promotion && (
        <div
          className={twMerge(
            "absolute top-4 z-10 w-fit rounded-md bg-gradient-to-r from-[#1746a2] to-[#5f9df7] px-2 py-1 text-xs text-white",
            data.promotion === "" && "invisible",
          )}
        >
          <p>{data.promotion}</p>
        </div>
      )}
      <div className="relative mb-4 mt-2 object-cover duration-300 group-hover:scale-105">
        <img src={data.image} alt={data.name} className="mx-auto max-w-36"></img>
      </div>
      {data.tag && (
        <p className="absolute -right-12 top-5 w-fit rotate-45 scale-90 bg-primary-500 px-12 py-1 text-center text-sm uppercase text-white duration-200 group-hover:scale-100">
          SIÊU SALE
        </p>
      )}
      <p className="mb-2 font-semibold duration-300 group-hover:text-blue-700">{data.name}</p>
      <p className="text-sm">
        <BiSolidDiscount className="mr-1 inline" /> Online giá quá rẻ
      </p>
      <p className="mb-1 text-sm font-medium text-slate-700">
        <span className="mr-2 text-base font-bold text-primary-500">
          {beautifyNumber(data?.price * (1 - data?.discount))}
        </span>
        {Boolean(data?.discount) && <span>-{data?.discount * 100}%</span>}
      </p>
      <div className="flex items-center space-x-2 text-sm font-bold text-yellow-400">
        <div>{data?.star.toFixed(1)}</div>
        <AiFillStar />
        <span className="font-normal text-gray-700">({data?.totalVote})</span>
      </div>
    </div>
  );
};

export default ProductCard;
