import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useToast from "@hooks/useToast";
import { clearCart } from "@slices/commonSlice";
import { orderService, paymentService } from "@services/index";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { PROFILE_PATH } from "@constants/routeConstant";
import { Button, Selector, paymentFormSchema } from "@common/Components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const DEFAULT_VALUE = {
  paymentMethod: [],
};

const OrderPaymentMethod = ({ order }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(paymentFormSchema(t)),
    defaultValues: DEFAULT_VALUE,
  });

  const handlePayment = useCallback(
    async (paymentMethod) => {
      if (paymentMethod === "momo") {
        const redirectUrl = window.location.origin + PROFILE_PATH.ORDER_HISTORY_TAB("processing");

        const dataMomo = {
          orderId: order._id,
          orderInfo: t("momoPaymentMessage", { name: order.fullname, orderId: order._id }),
          redirectUrl,
          amount: order.Number(order.totalPrice),
          extraData: "",
        };

        const response = await paymentService.createMomoPayment(dataMomo);
        localStorage.removeItem("order");

        await orderService.updateOrderById(order._id, {
          payment: {
            name: "momo",
            paid: true,
          },
        });

        window.location = response.payUrl;
      } else {
        navigate(PROFILE_PATH.ORDER_HISTORY_TAB("processing"));
      }
    },
    [navigate, order, t],
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);
    const { paymentMethod } = formData;

    try {
      await orderService.createOrder({
        ...order,
        payment: {
          name: paymentMethod[0],
          paid: false,
        },
      });
      toast.success(t("orderSuccessfully"));
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsSubmitting(false);
      dispatch(clearCart());
      handlePayment(paymentMethod[0]);
    }
  });

  useEffect(() => {
    setIsSubmitting(false);
    reset(DEFAULT_VALUE);
  }, [reset]);

  const methodOptions = useMemo(
    () => [
      { value: "cash", label: t("cash") },
      { value: "atm", label: t("atm") },
      { value: "momo", label: t("momo") },
      { value: "vnpay", label: t("vnpay") },
    ],
    [t],
  );

  if (!order) {
    return <Navigate to="/cart" />;
  }

  return (
    <>
      <div>
        <div className="font-semibold">{t("choosePaymentMethod")}:</div>
        <Selector control={control} name="paymentMethod" options={methodOptions} />
      </div>
      <Button isLoading={isSubmitting} onClick={handleSubmit} className="w-full">
        {t("confirm")}
      </Button>
    </>
  );
};

export default memo(OrderPaymentMethod);
