import { HOME_PATH } from "@constants/routeConstant";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import HomeBlankPage from "../Components/HomeBlankPage";
import NotFoundError from "@common/Error/Components/NotFoundError";

const HomeRoutes = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route path={HOME_PATH.HOME} element={<Home title={t("home")} />} />
      <Route path={HOME_PATH.ABOUT} element={<HomeBlankPage title={t("about")} />} />
      <Route path={HOME_PATH.BLOGS} element={<HomeBlankPage title={t("blogs")} />} />
      <Route path={HOME_PATH.PARTNERS} element={<HomeBlankPage title={t("partners")} />} />
      <Route path={HOME_PATH.CONTACT} element={<HomeBlankPage title={t("contact")} />} />
      <Route path={HOME_PATH.GETTING_STARTED} element={<HomeBlankPage title={t("started")} />} />
      <Route path={HOME_PATH.DOCUMENTATION} element={<HomeBlankPage title={t("documentation")} />} />
      <Route path={HOME_PATH.GUIDE} element={<HomeBlankPage title={t("guides")} />} />
      <Route path={HOME_PATH.FAQ} element={<HomeBlankPage title={t("faqs")} />} />
      <Route path={HOME_PATH.TERM} element={<HomeBlankPage title={t("termsConditions")} />} />
      <Route path={HOME_PATH.NOTICE} element={<HomeBlankPage title={t("notice")} />} />
      <Route path={HOME_PATH.CLAIM} element={<HomeBlankPage title={t("claim")} />} />
      <Route path={HOME_PATH.NOT_FOUND} element={<NotFoundError />} />
    </Routes>
  );
};

export default HomeRoutes;
