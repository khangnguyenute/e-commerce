import { OptionLegacy, SelectLegacy } from "@common/Components";
import { LoadingSkeleton } from "@common/Components/Loading";
import { DEFAULT_PAGE_LANGUAGE } from "@constants/commonConstant";
import { languageService } from "@services/index";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const HeaderLanguageSelector = () => {
  const { t } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_PAGE_LANGUAGE);

  const { languages } = useSelector((state) => state.common);

  const handChangeLanguage = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    languageService.setPageLanguage(newLanguage).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    setSelectedLanguage(languageService.getPageLanguage());
  }, []);

  return (
    <SelectLegacy
      className="ml-8 rounded-lg border p-2 shadow-md"
      defaultValue={selectedLanguage}
      onChange={(value) => handChangeLanguage(value)}
    >
      {languages.map((item) => {
        return (
          <OptionLegacy value={item.code} className="flex" key={item.code}>
            <div className="mr-4 mt-0.5 h-5 w-8 bg-gray-100">
              {!item.flag ? (
                <LoadingSkeleton className="h-full w-full" />
              ) : (
                <img
                  src={item.flag}
                  alt={item.name}
                  className="h-full w-full border-2 border-gray-100 object-cover object-center"
                />
              )}
            </div>
            {t(item.name)}
          </OptionLegacy>
        );
      })}
    </SelectLegacy>
  );
};

export default memo(HeaderLanguageSelector);
