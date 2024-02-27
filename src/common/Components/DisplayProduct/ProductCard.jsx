import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { isEmpty, lowerCase } from "lodash";
import { beautifyNumber } from "../Utils";
import { CLIENT_PATH } from "@constants/routeConstant";
import { useCallback } from "react";

const ProductCard = ({ data, isBorder = false, className }) => {
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
        "group relative flex flex-col justify-start space-y-2 rounded-md bg-white p-4 shadow-sm",
        isBorder && "border-2 border-gray-200 hover:border-blue-500",
        className,
      )}
      onClick={handleClick}
    >
      <div
        className={twMerge(
          "absolute z-10 w-fit rounded-md bg-gradient-to-r from-[#1746a2] to-[#5f9df7] px-2 py-1 text-xs text-white",
          data.promotion === "" && "invisible",
        )}
      >
        <p>{data.promotion}</p>
      </div>

      <div className="relative w-full object-contain">
        <img src={data.image} alt=""></img>
        {data.docquyen && (
          <img
            className="h-w-10 absolute bottom-0 left-0 w-10"
            src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"
            alt=""
          ></img>
        )}
        {data.baohanh === "18T" && (
          <img
            className="h-w-10 absolute bottom-0 left-0 w-10"
            src="https://cdn.tgdd.vn/ValueIcons/Label_01-02.png"
            alt=""
          ></img>
        )}
      </div>

      {data.tag && (
        <p className="mx-autơ w-[160px] rounded-3xl bg-[#db2562] p-2 text-center text-xs font-medium uppercase text-white">
          {data.tag}
        </p>
      )}

      <span className="text-base font-semibold">{data.name}</span>

      {!isEmpty(data.parameter?.RAM) && (
        <div>
          {/* {data.parameter?.RAM?.map((item, index) => (
              <span
                key={index}
                className={twMerge(
                  "mr-2 rounded-md border border-solid border-[#2f80ed] p-1 text-xs text-[#2f80ed]",
                )}
                // onClick={(e) => {
                //   handleClickDisable(e);
                //   setChecked(index);
                // }}
              >
                RAM {item}
              </span>
            ))} */}
        </div>
      )}

      <div className="flex items-center space-x-1 text-sm font-medium text-slate-700">
        <div className="line-through">{beautifyNumber(data?.price)}</div>
        <div className="">-{data?.discount * 100}%</div>
      </div>

      <div className="text-base font-bold text-primary-500">
        {beautifyNumber(data?.price * (1 - data?.discount))}
      </div>

      <div className="flex items-center space-x-2 font-bold text-yellow-400">
        <div>{data?.star.toFixed(1)}</div>
        <AiFillStar />
        <span className="font-normal text-gray-700">({data?.totalVote})</span>
      </div>
    </div>
  );
};

export default ProductCard;
