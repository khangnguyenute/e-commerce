import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "@services/index";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { PROFILE_PATH } from "@constants/routeConstant";
import ProfileOrderHistoryContainer from "./Components/Container";

const ProfileOrderHistory = ({ tab: defaultActivatedTab }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { tab: activatedTabParam } = useParams();

  const [queryParam, setQueryParam] = useState(null);

  const activatedTab = useMemo(
    () => defaultActivatedTab ?? activatedTabParam,
    [activatedTabParam, defaultActivatedTab],
  );

  const tabs = useMemo(
    () => [
      { id: "all", title: t("all") },
      { id: "processing", title: t("processing") },
      { id: "packed", title: t("packed") },
      { id: "inTransit", title: t("inTransit") },
      { id: "delivered", title: t("delivered") },
      { id: "canceled", title: t("canceled") },
    ],
    [t],
  );

  const handleChangeTab = useCallback(
    (tab) => {
      navigate(PROFILE_PATH.ORDER_HISTORY_TAB(tab));
    },
    [navigate],
  );

  useDocumentTitle(t("orderHistory"));

  return (
    <div>
      <div className="mb-6 text-xl font-semibold">{t("orderHistory")}</div>
      <ContentWrapper
        activatedTab={activatedTab}
        bodyClassName="m-0 p-4 md:p-6"
        className="mx-auto w-full"
        isShowHeader={false}
        tabClassName="bg-transparent lg:bg-gray-100 border-b-2 lg:border-b-0 border-gray-100 px-4 md:px-6"
        tabItemClassName="px-0 mr-6 lg:mr-0 -mb-0.5 lg:mb-0 py-3 lg:px-6 border-0 lg:border-2 lg:py-3"
        activatedTabItemClassName="border-b-2 lg:border-2 lg:border-gray-100 lg:border-transparent border-primary-700"
        tabs={tabs}
        onChangeTab={handleChangeTab}
      >
        <ProfileOrderHistoryContainer
          status="all"
          queryParam={queryParam}
          onChangeState={setQueryParam}
          onGetOrderHistories={orderService.getOrders}
        />
        <ProfileOrderHistoryContainer
          status="processing"
          queryParam={queryParam}
          onChangeState={setQueryParam}
          onGetOrderHistories={orderService.getOrders}
        />
        <ProfileOrderHistoryContainer
          status="packed"
          queryParam={queryParam}
          onChangeState={setQueryParam}
          onGetOrderHistories={orderService.getOrders}
        />
        <ProfileOrderHistoryContainer
          status="inTransit"
          queryParam={queryParam}
          onChangeState={setQueryParam}
          onGetOrderHistories={orderService.getOrders}
        />
        <ProfileOrderHistoryContainer
          status="delivered"
          queryParam={queryParam}
          onChangeState={setQueryParam}
          onGetOrderHistories={orderService.getOrders}
        />
        <ProfileOrderHistoryContainer
          status="canceled"
          queryParam={queryParam}
          onChangeState={setQueryParam}
          onGetOrderHistories={orderService.getOrders}
        />
      </ContentWrapper>
    </div>
  );
};

export default memo(ProfileOrderHistory);
