import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";
import OrderHistoryTable from "./Table";
import ProfileOrderHistoryGrid from "./Grid";
import ProfileOrderHistoryGridSkeleton from "./GridSkeleton";
import { isEmpty } from "lodash";
import { TableContentBodyEmptyItem } from "@common/Components";

const ProfileOrderHistoryContainer = ({ status, queryParam, onChangeState, onGetOrderHistories }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const isFirstRef = useRef(true);

  const currentUser = useSelector((state) => state.common.user);

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const getOrders = useCallback(async () => {
    if (!queryParam) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await onGetOrderHistories({
        ...queryParam,
        customerId: currentUser?._id,
        status,
      });

      setOrderData(data);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
      isFirstRef.current = false;
    }
  }, [currentUser?._id, onGetOrderHistories, queryParam, status, t, toast]);

  useEffect(() => {
    if (!isFirstRef.current) {
      return;
    }
    getOrders();
  }, [getOrders]);

  const children = useMemo(() => {
    if (isLoading) {
      return <ProfileOrderHistoryGridSkeleton />;
    }
    if (isEmpty(orderData)) {
      return <TableContentBodyEmptyItem />;
    }
    return <ProfileOrderHistoryGrid orders={orderData} status={status} isLoading={isLoading} />;
  }, [isLoading, orderData, status]);

  useDocumentTitle(t("orderHistory"));

  return (
    <OrderHistoryTable
      data={orderData}
      isLoading={isLoading}
      totalRows={totalRows}
      onChangeState={onChangeState}
    >
      {children}
    </OrderHistoryTable>
  );
};

export default memo(ProfileOrderHistoryContainer);
