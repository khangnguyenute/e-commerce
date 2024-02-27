import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";
import OrderHistoryTable from "./Table";
import ProfileOrderHistoryGrid from "./Grid";
import ProfileOrderHistoryGridSkeleton from "./GridSkeleton";
import { isEmpty } from "lodash";
import { TableContentBodyEmptyItem } from "@common/Components";

const ProfileOrderHistoryContainer = ({ status, queryParams, onChangeState, onGetOrderHistories }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const currentUser = useSelector((state) => state.common.user);

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  const getOrders = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    let service = onGetOrderHistories({
      ...queryParams,
      customerId: currentUser?.userId,
    });

    if (status !== "all") {
      service = onGetOrderHistories({
        ...queryParams,
        customerId: currentUser?.userId,
        status: status,
      });
    }

    try {
      const { data, meta } = await service;

      setOrderData(data);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.userId, onGetOrderHistories, queryParams, status, t, toast]);

  useEffect(() => {
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
