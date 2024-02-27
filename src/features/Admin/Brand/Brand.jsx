import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminBrandModificationModal from "./Components/ModificationModal";
import AdminBrandTable from "./Components/Table";
import AdminBrandHeaderAction from "./Components/HeaderAction";
import useToast from "@hooks/useToast";
import { brandService } from "@services/index";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "@common/Components/Modal";

const AdminBrandManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [brandData, setBrandData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedBrand = useMemo(() => {
    return brandData.find((item) => item._id === selectedBrandId) ?? null;
  }, [selectedBrandId, brandData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedBrandId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedBrandId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await brandService.getBrands(queryParams);

      setBrandData(data);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, t, toast]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedBrand) {
      return;
    }

    try {
      await brandService.deleteBrandById(selectedBrand?._id);

      toast.success("deleteBrandSuccessfully");
      fetchData();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedBrand, t, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedBrandId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDocumentTitle(t("brandManagement"));

  return (
    <ContentWrapper
      title={t("brandManagement")}
      actions={<AdminBrandHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminBrandTable
        data={brandData}
        isLoading={isLoading}
        totalRows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
      />

      <ConfirmationModal
        title={t("deleteBrand", { name: selectedBrand?.name })}
        message={t("deleteBrandMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <AdminBrandModificationModal
        isOpen={isShowModificationModal}
        brand={selectedBrand}
        onCreate={brandService.createBrand}
        onCreated={fetchData}
        onEdit={brandService.updateBrandById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default memo(AdminBrandManagement);
