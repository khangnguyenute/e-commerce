import { memo, useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderService } from "@services/index";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { PROFILE_PATH } from "@constants/routeConstant";
import ProfileOrderHistoryContainer from "./Components/Container";
import { Section } from "@common/Components";

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
    <Section title={t("orderHistory")}>
      <ContentWrapper
        activatedTab={activatedTab}
        className="p-0"
        bodyClassName="p-0 md:p-0 border-0 shadow-none m-0 mt-4"
        isShowHeader={false}
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
    </Section>
  );
};

export default memo(ProfileOrderHistory);
