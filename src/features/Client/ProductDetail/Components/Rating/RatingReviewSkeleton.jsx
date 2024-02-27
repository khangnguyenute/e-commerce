import { LoadingSkeleton } from "@common/Components";

const ProductDetailRatingReviewSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4 rounded-xl border bg-white px-4 py-2 shadow-lg">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 font-semibold">
          <LoadingSkeleton className="h-6 w-40" />
          <div className="flex space-x-1">
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
            <LoadingSkeleton className="h-4 w-4" />
          </div>
        </div>

        <div>
          <LoadingSkeleton className="h-6 w-full" />
          <LoadingSkeleton className="mt-1 h-6 w-full" />
        </div>

        <div className="flex space-x-2">
          <LoadingSkeleton className="h-6 w-6" />
          <LoadingSkeleton className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailRatingReviewSkeleton;
