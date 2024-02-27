import { categoryService } from "@services/index";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import AdminCategoryHeaderAction from "./Components/HeaderAction";
import AdminCategoryTable from "./Components/Table";
import AdminCategoryModificationModal from "./Components/ModificationModal";
import useToast from "@hooks/useToast";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "@common/Components/Modal";

const AdminCategoryManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedCategory = useMemo(() => {
    return categoryData.find((item) => item._id === selectedCategoryId) ?? null;
  }, [selectedCategoryId, categoryData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedCategoryId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedCategoryId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await categoryService.getCategories(queryParams);

      setCategoryData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [queryParams, t, toast]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedCategory) {
      return;
    }

    try {
      await categoryService.deleteCategoryById(selectedCategory?._id);

      toast.success(t("deleteCategorySuccessfully"));
      fetchData();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedCategory, t, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedCategoryId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDocumentTitle(t("categoryManagement"));

  return (
    <ContentWrapper
      title={t("categoryManagement")}
      actions={<AdminCategoryHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminCategoryTable
        data={categoryData}
        isLoading={isLoading}
        totalRows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
      />

      <ConfirmationModal
        title={t("deleteCategory", { name: selectedCategory?.name })}
        message={t("deleteCategoryMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <AdminCategoryModificationModal
        isOpen={isShowModificationModal}
        category={selectedCategory}
        onCreate={categoryService.createCategory}
        onCreated={fetchData}
        onEdit={categoryService.updateCategoryById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default memo(AdminCategoryManagement);
