import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { BsHeartbreakFill } from "react-icons/bs";
import { Carousel, Section } from "@common/Components";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  500: {
    slidesPerView: 2,
  },
  900: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },
};

const ProfileFavorite = () => {
  const { t } = useTranslation();

  const user = useSelector((state) => state.common.user);

  useDocumentTitle(t("profile"));

  return (
    <Section title={t("favorite")}>
      {isEmpty(user.favoriteProducts) && (
        <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
          <BsHeartbreakFill size={40} className="text-gray-400" />
          <div className="mt-2 text-gray-400">{t("favoriteProductsEmpty")}</div>
        </div>
      )}
      {!isEmpty(user.favoriteProducts) && (
        <Carousel
          gallery={user.favoriteProducts}
          contentClassName="h-36 xs:h-72 sm:h-80 xs:block"
          breakpoints={breakpoints}
        />
      )}
    </Section>
  );
};

export default memo(ProfileFavorite);
