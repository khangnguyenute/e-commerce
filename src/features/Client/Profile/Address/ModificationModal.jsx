import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { values } from "lodash";
import { PATHS } from "@constants/apiConstant";
import useToast from "@hooks/useToast";
import { Checkbox, Input, Modal, Select, addressFormSchema } from "@common/Components";
import { useTranslation } from "react-i18next";

const DEFAULT_VALUE = {
  fullname: "",
  phone: "",
  city: "",
  district: "",
  ward: "",
  address: "",
  mnemonicName: "",
};

const ProfileAddressModificationModal = ({
  isOpen,
  selectedAddress,
  onClose,
  onCreate,
  onEdit,
  ...props
}) => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);

  const {
    control,
    reset,
    watch,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(addressFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const city = watch("city");
  const district = watch("district");
  const ward = watch("ward");

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
  }, [city.id, toast, t]);

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

  const handleAddAddress = useCallback(
    async (formData) => {
      try {
        await onCreate(dispatch, formData, user._id);
        toast.success(t("addAddressSuccessfully"));
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [onCreate, dispatch, user._id, toast, t, onClose],
  );

  const handleUpdateAddressById = useCallback(
    async (formData) => {
      if (!selectedAddress) return;

      const data = {
        oldAddress: selectedAddress,
        newAddress: formData,
      };
      try {
        await onEdit(dispatch, data, user._id);
        toast.success(t("updateAddressSuccessfully"));
        onClose();
      } catch (error) {
        toast.error(t("unknown"));
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedAddress, onEdit, dispatch, user._id, toast, t, onClose],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!selectedAddress) {
      handleAddAddress(formData);
      return;
    }

    handleUpdateAddressById(formData);
  });

  useEffect(() => {
    fetchCityData();
    fetchDistrictData();
    fetchWardData();
  }, [fetchCityData, fetchDistrictData, fetchWardData]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (selectedAddress) {
      reset(selectedAddress);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, selectedAddress]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={selectedAddress ? t("updateAddress") : t("addAddress")}
      onClose={onClose}
      onConfirm={handleSubmit}
      isAllowSubmit={!!ward.id}
      {...props}
    >
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label={t("fullname")}
        name="fullname"
        isRequired
      />
      <div className="grid gap-6 xs:grid-cols-2">
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("mnemonicName")}
          name="mnemonicName"
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
      </div>
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
      <label htmlFor="isDefault" className="group flex items-center justify-start space-x-4">
        <Checkbox name="isDefault" className="flex-shrink-0" disabled={isSubmitting} control={control} />
        <div className="text-sm font-semibold leading-6 text-gray-500">{t("setDefaultAddress")}</div>
      </label>
    </Modal>
  );
};

export default memo(ProfileAddressModificationModal);
