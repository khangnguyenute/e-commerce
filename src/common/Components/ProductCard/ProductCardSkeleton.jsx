import { LoadingSkeleton } from "../Loading";

function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col space-y-2">
      <LoadingSkeleton className="h-48 w-full" />
      <LoadingSkeleton className="h-8 w-40" />
      <LoadingSkeleton className="h-6 w-full" />
      <div className="flex items-center space-x-2">
        <LoadingSkeleton className="h-6 w-16" />
        <LoadingSkeleton className="h-6 w-16" />
      </div>
      <div className="flex items-center space-x-2 ">
        <LoadingSkeleton className="h-6 w-2/5" />
        <LoadingSkeleton className="h-6 w-2/5" />
        <LoadingSkeleton className="h-6 w-1/5" />
      </div>
      <div className="flex items-center space-x-2">
        <LoadingSkeleton className="h-6 w-6" />
        <LoadingSkeleton className="h-6 w-6" />
        <LoadingSkeleton className="h-6 w-6" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
