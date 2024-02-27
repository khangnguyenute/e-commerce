import { useParams } from "react-router-dom";
import { memo, useCallback, useEffect, useState } from "react";
import { orderService } from "@services/index";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";
import ProfileOrderHistoryGridContent from "./GridContent";
import ProfileOrderHistoryGridSkeleton from "./GridSkeleton";
import { NotFoundError } from "@common/Error/Components";

const ProfileOrderHistoryDetail = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const { orderId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);

  const getOrderById = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await orderService.getOrderById(orderId);

      setOrderData(data);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [orderId, t, toast]);

  useEffect(() => {
    getOrderById();
  }, [getOrderById]);

  useDocumentTitle(t("orderDetail"));

  if (isLoading) {
    return <ProfileOrderHistoryGridSkeleton isDetailed />;
  }

  if (!isLoading && !orderData) {
    return <NotFoundError />;
  }

  return <ProfileOrderHistoryGridContent order={orderData} isDetailed />;
};

export default memo(ProfileOrderHistoryDetail);
