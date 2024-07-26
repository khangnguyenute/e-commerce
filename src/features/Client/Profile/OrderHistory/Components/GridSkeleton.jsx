import { LoadingSkeleton } from "@common/Components";
import { memo } from "react";

const ProfileOrderHistoryGridSkeleton = ({ isDetailed }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6">
      {Array.from({ length: 1 }).map((_, index) => (
        <div key={index} className="flex flex-col rounded-xl border bg-white p-6 shadow-base">
          <div className="flex justify-between space-x-4">
            <LoadingSkeleton className="h-5 w-48" />
            <LoadingSkeleton className="h-5 w-14" />
          </div>
          <LoadingSkeleton className="mt-2 h-5 w-48" />

          {isDetailed && (
            <div className="mt-4 flex flex-col space-y-2">
              <div className="flex justify-between space-x-4">
                <LoadingSkeleton className="h-5 w-80" />
                <LoadingSkeleton className="h-5 w-24" />
              </div>
              <div className="flex justify-between space-x-4">
                <LoadingSkeleton className="h-5 w-80" />
                <LoadingSkeleton className="h-5 w-24" />
              </div>
              <div className="flex justify-between space-x-4">
                <LoadingSkeleton className="h-5 w-80" />
                <LoadingSkeleton className="h-5 w-24" />
              </div>
            </div>
          )}

          <LoadingSkeleton className="mt-4 h-52 w-full rounded-lg" />

          <LoadingSkeleton className="mt-4 h-5 w-14" />
        </div>
      ))}
    </div>
  );
};

export default memo(ProfileOrderHistoryGridSkeleton);
