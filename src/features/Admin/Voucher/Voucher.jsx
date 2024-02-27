import { voucherService } from "@services/index";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminVoucherHeaderAction from "./Components/HeaderAction";
import AdminVoucherTable from "./Components/Table";
import AdminVoucherModificationModal from "./Components/ModificationModal";
import useToast from "@hooks/useToast";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "@common/Components/Modal";

const AdminVoucherManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [voucherData, setVoucherData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedVoucher = useMemo(() => {
    return voucherData.find((item) => item.voucherId === selectedVoucherId) ?? null;
  }, [selectedVoucherId, voucherData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedVoucherId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedVoucherId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await voucherService.getVouchers(queryParams);

      setVoucherData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [queryParams, t, toast]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedVoucher) {
      return;
    }

    try {
      await voucherService.deleteVoucherById(selectedVoucher?._id);

      toast.success(t("deleteVoucherSuccessfully"));
      fetchData();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedVoucher, t, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedVoucherId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDocumentTitle(t("voucherManagement"));

  return (
    <ContentWrapper
      title={t("voucherManagement")}
      actions={<AdminVoucherHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminVoucherTable
        data={voucherData}
        isLoading={isLoading}
        totalRows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
      />

      <ConfirmationModal
        title={t("deleteVoucher", { name: selectedVoucher?.name })}
        message={t("deleteVoucherMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <AdminVoucherModificationModal
        isOpen={isShowModificationModal}
        voucher={selectedVoucher}
        onCreate={voucherService.createVoucher}
        onCreated={fetchData}
        onEdit={voucherService.updateVoucherById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default memo(AdminVoucherManagement);
