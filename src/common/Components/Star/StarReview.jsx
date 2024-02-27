import { memo, useCallback } from "react";
import { Star } from "@common/Components";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

const StarReview = ({ totalStar = 0, totalVote = 0 }) => {
  const { t } = useTranslation();

  const handleCountReviews = useCallback(
    (review) => {
      if (!review || review <= 1) {
        return `${review} ${t("review")}`;
      }
      return `${review} ${t("reviews")}`;
    },
    [t],
  );

  return (
    <div className={twMerge("flex items-center space-x-4")}>
      <div className="font-bold text-yellow-600">{totalStar.toFixed(1)}</div>
      <Star value={totalStar} />
      <div>{handleCountReviews(totalVote)}</div>
    </div>
  );
};

export default memo(StarReview);
