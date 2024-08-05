import { useState, useCallback, memo } from "react";
import { AiFillStar } from "react-icons/ai";
import ProductDetailRatingModal from "./RatingModal";
import ProductDetailRatingReview from "./RatingReview";
import ProductDetailRatingProcess from "./RatingProcess";
import { useEffect } from "react";
import { ratingService } from "@services/index";
import useToast from "@hooks/useToast";
import { useTranslation } from "react-i18next";
import { Button } from "@common/Components";
import ProductDetailRatingTable from "./RatingTable";
import { useSelector } from "react-redux";

const ProductDetailRating = ({ product, className }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [ratingData, setRatingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryParams, setQueryParams] = useState(null);
  const [totalRows, setTotalRows] = useState(0);

  const fetchRatingData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);
    try {
      const { data, meta } = await ratingService.getRatingsByProductId(product?._id);
      setRatingData(data);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [product?._id, queryParams, t, toast]);

  useEffect(() => {
    fetchRatingData();
  }, [fetchRatingData]);

  const handleOpenModal = useCallback(() => {
    if (!user) {
      toast.warning(t("doNotLogIn"));
      return;
    }
    setIsOpenModal(true);
  }, [t, toast, user]);

  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, [setIsOpenModal]);

  return (
    <div className={className}>
      <p className="mb-2 text-xl font-bold">{t("review")}</p>
      <div className="w-full rounded-lg border px-4 py-4">
        <ProductDetailRatingProcess isLoading={isLoading} ratingData={ratingData} totalVote={totalRows} />

        <ProductDetailRatingTable
          data={ratingData}
          isLoading={isLoading}
          totalRows={totalRows}
          onChangeState={setQueryParams}
        >
          <ProductDetailRatingReview data={ratingData} isLoading={isLoading} onGetRatings={fetchRatingData} />
        </ProductDetailRatingTable>
        <Button size="sm" className="mx-auto mt-4 w-1/2 text-sm" onClick={handleOpenModal}>
          <AiFillStar size={20} />
          <span>{t("addReview")}</span>
        </Button>
      </div>

      {isOpenModal && (
        <ProductDetailRatingModal
          isOpen={isOpenModal}
          product={product}
          user={user}
          onClose={handleCloseModal}
          onGetRatings={fetchRatingData}
        />
      )}
    </div>
  );
};

export default memo(ProductDetailRating);
