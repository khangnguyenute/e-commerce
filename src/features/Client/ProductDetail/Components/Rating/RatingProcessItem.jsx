import { memo, useMemo } from "react";
import { AiFillStar } from "react-icons/ai";

const ProductDetailRatingProcessItem = ({ star, ratingData, totalVote }) => {
  const starPrecent = useMemo(() => {
    if (!totalVote) {
      return 0;
    }
    const starReviewAmount = ratingData.filter((rating) => rating.star === star).length;
    return Number((starReviewAmount * 100) / totalVote);
  }, [ratingData, star, totalVote]);

  return (
    <div className="flex items-center space-x-4 text-sm font-semibold">
      <div className="flex w-6 flex-none items-center justify-start">
        {star}
        <AiFillStar />
      </div>
      <div className="h-1.5 w-full grow overflow-hidden rounded-lg bg-gray-200">
        <div className="h-full bg-yellow-600" style={{ width: `${starPrecent}%` }} />
      </div>
      <div className=" w-14 flex-none text-blue-500">{starPrecent.toFixed(2)}%</div>
    </div>
  );
};

export default memo(ProductDetailRatingProcessItem);
