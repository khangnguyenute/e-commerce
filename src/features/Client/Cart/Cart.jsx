import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import useToast from "@hooks/useToast";
import { addressFormSchema } from "@common/Components/Schemas/addressFormSchema";
import useCart from "@hooks/useCart";
import { postOrder } from "@slices/commonSlice";
import { useTranslation } from "react-i18next";
import CartProduct from "./Components/Product";
import CartOrder from "./Components/Order";
import CartReceiver from "./Components/Receiver";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { isEmpty } from "lodash";
import CartEmpty from "./Components/Empty";
import CartHeader from "./Components/Header";

const DEFAULT_VALUE = {
  name: "",
  phone: "",
  city: "",
  district: "",
  ward: "",
  address: "",
  voucher: "",
};

const Cart = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);

  const { cartData, totalPrice, totalQuantity } = useCart();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discount, setDiscount] = useState(0);

  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm({
    resolver: yupResolver(addressFormSchema(t, false)),
    defaultValues: DEFAULT_VALUE,
  });

  const mnemonicName = watch("mnemonicName");

  const addressDefault = useMemo(
    () => user?.address?.find((item) => item?.mnemonicName === mnemonicName),
    [user?.address, mnemonicName],
  );

  const handleApplyDiscount = useCallback((value) => {
    setDiscount(value);
  }, []);

  const handleSubmit = useFormSubmit(async (formData) => {
    if (!user) {
      toast.warning(t("doNotLogIn"));
      return;
    }
    setIsSubmitting(false);

    const newData = {
      _id: Date.now(),
      customerId: user?._id,
      ...formData,
      receiver: "",
      payment: {
        name: "",
        paid: "false",
      },
      discount,
      totalPrice,
      totalQuantity,
      status: "processing",
      orderItems: cartData,
      time: dayjs().format("HH:MM MM/DD/YYYY"),
    };

    try {
      dispatch(postOrder(newData));
      navigate("/order");
    } catch {
      toast.error(t("unknown"));
    }
  });

  useEffect(() => {
    if (addressDefault) {
      reset(addressDefault);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [reset, addressDefault]);

  useDocumentTitle(t("cart"));

  if (isEmpty(cartData)) {
    return <CartEmpty />;
  }

  return (
    <div className="section__container">
      <CartHeader />

      <div className="mt-2 grid grid-cols-3 gap-6">
        <CartProduct cartData={cartData} className="col-span-2" />
        <div className="col-span-1">
          <FormProvider control={control} reset={reset} watch={watch} setValue={setValue} {...methods}>
            <form onSubmit={useFormSubmit} className="grid grid-cols-1 gap-6">
              <CartReceiver isSubmitting={isSubmitting} />
              <CartOrder
                isSubmitting={isSubmitting}
                discount={discount}
                totalPrice={totalPrice}
                onApplyDiscount={handleApplyDiscount}
                onSubmit={handleSubmit}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default memo(Cart);
