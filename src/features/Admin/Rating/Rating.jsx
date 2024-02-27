import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import AdminRatingModificationModal from "./Components/ModificationModal";
import AdminRatingTable from "./Components/Table";
import { ratingService } from "@services/index";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "@common/Components/Modal";
import useToast from "@hooks/useToast";

const AdminRatingManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedRatingId, setSelectedRatingId] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedRating = useMemo(() => {
    return ratingData.find((item) => item._id === selectedRatingId) ?? null;
  }, [selectedRatingId, ratingData]);

  const handleClickViewButton = useCallback((id) => {
    setSelectedRatingId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedRatingId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await ratingService.getRatings(queryParams);

      setRatingData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [queryParams, t, toast]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedRating) {
      return;
    }

    try {
      await ratingService.deleteRatingById(selectedRating?._id);

      toast.success(t("deleteRatingSuccessfully"));
      fetchData();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedRating, t, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedRatingId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDocumentTitle(t("ratingManagement"));

  return (
    <ContentWrapper title={t("ratingManagement")}>
      <AdminRatingTable
        data={ratingData}
        isLoading={isLoading}
        totalRows={totalRows}
        onClickView={handleClickViewButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
      />

      <ConfirmationModal
        title={t("deleteRating")}
        message={t("deleteRatingMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <AdminRatingModificationModal
        isOpen={isShowModificationModal}
        rating={selectedRating}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default memo(AdminRatingManagement);
