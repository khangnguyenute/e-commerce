import { memo } from "react";
import ProductDetailRatingReviewContent from "./RatingReviewContent";
import ProductDetailRatingReviewSkeleton from "./RatingReviewSkeleton";

const ProductDetailRatingReview = ({ data, isLoading, onGetRatings }) => {
  if (isLoading) {
    return <ProductDetailRatingReviewSkeleton />;
  }

  return (
    <div className="mt-2 grid grid-cols-1 gap-2">
      {data.map((rating, index) => (
        <ProductDetailRatingReviewContent key={index} rating={rating} onGetRatings={onGetRatings} />
      ))}
    </div>
  );
};
export default memo(ProductDetailRatingReview);
