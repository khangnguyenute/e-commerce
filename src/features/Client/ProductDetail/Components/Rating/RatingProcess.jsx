import { LoadingSkeleton, StarReview } from "@common/Components";
import { isEmpty, reduce } from "lodash";
import { memo, useMemo } from "react";
import ProductDetailRatingProcessItem from "./RatingProcessItem";

const ProductDetailRatingProcess = ({ ratingData, totalVote, isLoading }) => {
  const totalStar = useMemo(() => {
    if (isEmpty(ratingData) || !totalVote) return 0;

    const total = reduce(
      ratingData,
      (sum, rating) => {
        return sum + Number(rating.star);
      },
      0,
    );
    return total / totalVote;
  }, [ratingData, totalVote]);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col space-y-1">
        <div className="flex items-center space-x-4">
          <LoadingSkeleton className="h-6 w-6" />
          <div className="flex">
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
          </div>
          <LoadingSkeleton className="h-6 w-20" />
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex w-full items-center space-x-4" key={index}>
            <LoadingSkeleton className="h-5 w-6 flex-none" />
            <LoadingSkeleton className="h-2 w-full grow" />
            <LoadingSkeleton className="h-5 w-14 flex-none" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="my-2 w-full">
      <StarReview totalStar={totalStar} totalVote={ratingData?.length} />

      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <ProductDetailRatingProcessItem
            key={index}
            ratingData={ratingData}
            totalVote={totalVote}
            star={index}
          />
        );
      })}
    </div>
  );
};

export default memo(ProductDetailRatingProcess);
