import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";

const Home = ({ title }) => {
  const { t } = useTranslation();

  useDocumentTitle(title);

  return <div className="flex h-fit-layout w-full items-center justify-center">{t("title")}</div>;
};

export default Home;
