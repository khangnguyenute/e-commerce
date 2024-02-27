import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { BsHeartbreakFill } from "react-icons/bs";
import { Carousel, Section } from "@common/Components";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const ProfileFavorite = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.common.user);

  useDocumentTitle(t("profile"));

  return (
    <div>
      <div className="mb-6 text-xl font-semibold">{t("favorite")}</div>
      <Section className="border border-solid border-gray-300 px-4">
        {isEmpty(user.favoriteProducts) ? (
          <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
            <BsHeartbreakFill size={40} className="text-gray-400" />
            <div className="mt-2 text-gray-400">{t("favoriteProductsEmpty")}</div>
          </div>
        ) : (
          <Carousel gallery={user.favoriteProducts} slidesPerView={4} isLoop={false} />
        )}
      </Section>
    </div>
  );
};

export default memo(ProfileFavorite);
