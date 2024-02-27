import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ContentWrapper from "../../../Components/Layout/Components/ContentWrapper";
import OrderModificationModal from "./Components/OrderModificationModal";
import OrderTable from "./Components/OrderTable";
import { InformationModal } from "../../../Components/Modal";
import OrderDetail from "./Components/OrderDetail";
import OrderStatus from "./Components/OrderStatus";
import { orderService } from "../../../Services";
import { useDocumentTitle } from "../../../Hooks";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";

const OrdeManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedOrder = useMemo(() => {
    return orderData.find((item) => item._id === selectedOrderId) ?? null;
  }, [selectedOrderId, orderData]);

  const handleClickViewButton = useCallback((id) => {
    setSelectedOrderId(id ?? null);
    setIsShowDetailModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedOrderId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await orderService.getOrders(queryParams);

      setOrderData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [queryParams]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDetailModal(false);
    setSelectedOrderId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDocumentTitle(t("orderManagement"));

  return (
    <ContentWrapper title={t("orderManagement")}>
      <OrderTable
        data={orderData}
        isLoading={isLoading}
        onChangeState={setQueryParams}
        rows={totalRows}
        onClickView={handleClickViewButton}
        onClickEdit={handleClickEditButton}
      />

      <InformationModal
        isOpen={isShowDetailModal}
        className="w-fit"
        title={
          <div className="flex items-center space-x-4">
            <span>{t("orderDetail")}</span>
            <span className="font-semibold text-red-500">{selectedOrder?._id}</span>
            <OrderStatus type={selectedOrder?.status} size="sm" message={selectedOrder?.status} />
          </div>
        }
        onClose={handleCloseModal}
      >
        <OrderDetail selectedOrder={selectedOrder} />
      </InformationModal>

      <OrderModificationModal
        isOpen={isShowModificationModal}
        order={selectedOrder}
        onEdit={orderService.updateOrderById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default memo(OrdeManagement);
