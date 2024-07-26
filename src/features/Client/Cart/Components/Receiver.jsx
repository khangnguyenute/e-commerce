import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { values } from "lodash";
import useToast from "@hooks/useToast";
import { Input, Select } from "@common/Components";
import { PATHS } from "@constants/apiConstant";
import { useTranslation } from "react-i18next";

const CartReceiver = ({ isSubmitting }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);

  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  const { control, watch } = useFormContext();

  const addressOptions = useMemo(
    () =>
      user?.address.map((item) => {
        return { value: item.mnemonicName, label: item.mnemonicName };
      }),
    [user],
  );

  const city = watch("city");
  const district = watch("district");

  const fetchCityData = useCallback(async () => {
    try {
      const { data } = await axios.get(PATHS.CITIES);
      setCityOptions(
        values(data.data).map((city) => ({
          value: { id: city.id, name: city.name },
          label: city.name,
        })),
      );
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [t, toast]);

  const fetchDistrictData = useCallback(async () => {
    if (!city.id) {
      return;
    }
    try {
      const { data } = await axios.get(`${PATHS.DISTRICTS}/${city.id}.json`);
      setDistrictOptions(
        values(data.data).map((district) => ({
          value: { id: district.id, name: district.name },
          label: district.name,
        })),
      );
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [city.id, t, toast]);

  const fetchWardData = useCallback(async () => {
    if (!district.id) {
      return;
    }
    try {
      const { data } = await axios.get(`${PATHS.WARDS}/${district.id}.json`);
      setWardOptions(
        values(data.data).map((ward) => ({
          value: { id: ward.id, name: ward.name },
          label: ward.name,
        })),
      );
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [district.id, toast, t]);

  useEffect(() => {
    fetchCityData();
    fetchDistrictData();
    fetchWardData();
  }, [fetchCityData, fetchDistrictData, fetchWardData]);

  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl border bg-white p-6 shadow-base">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{t("receiver")}</h3>
      </div>
      <Select
        className="text-normal"
        name="mnemonicName"
        control={control}
        disabled={isSubmitting}
        options={addressOptions}
        placeholder={t("mnemonicName")}
        isRequired={false}
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("fullname")}
        name="fullname"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("phone")}
        name="phone"
        isRequired
      />
      <Select
        className="text-normal"
        name="city"
        control={control}
        disabled={isSubmitting}
        options={cityOptions}
        placeholder={t("city")}
        isRequired
      />
      <Select
        className="text-normal"
        name="district"
        control={control}
        isDisabled={isSubmitting || !city}
        options={districtOptions}
        placeholder={t("district")}
        isRequired
      />
      <Select
        className="text-normal"
        name="ward"
        control={control}
        isDisabled={isSubmitting || !district}
        options={wardOptions}
        placeholder={t("ward")}
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("address")}
        name="address"
        isRequired
      />
    </div>
  );
};

export default memo(CartReceiver);
