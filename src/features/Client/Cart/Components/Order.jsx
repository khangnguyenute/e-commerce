import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import useToast from "@hooks/useToast";
import { Button, Input } from "@common/Components";
import { numberFormat } from "@utils/Helpers";
import { voucherService } from "@services/index";
import { Trans, useTranslation } from "react-i18next";

const CartOrder = ({ discount, totalPrice, isSubmitting, onApplyDiscount, onSubmit }) => {
  const { t } = useTranslation();
  const toast = useToast();

  const { control, watch, setValue } = useFormContext();

  const voucher = watch("voucher");

  const handleVoucher = useCallback(async () => {
    if (!voucher) {
      return;
    }
    try {
      const response = await voucherService.checkVoucher({
        name: voucher,
      });
      onApplyDiscount(totalPrice * response.sale);
      toast.success(t("applyVoucherSuccessfully"));
    } catch (error) {
      toast.error(error.response.data.error);
      setValue("voucher", "");
    }
  }, [voucher, onApplyDiscount, totalPrice, toast, t, setValue]);

  return (
    <div className="flex flex-col space-y-4 rounded-xl border bg-white p-6 shadow-base">
      <div className="flex items-center justify-between space-x-4">
        <Input
          className="block"
          label={t("voucher")}
          name="voucher"
          control={control}
          disabled={isSubmitting}
        />

        <Button size="xs" onClick={handleVoucher} className="lg:rounded-lg">
          {t("apply")}
        </Button>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">{t("temporary")}:</span>
        <span className="font-bold text-primary-700">{numberFormat(totalPrice)}₫</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">{t("discount")}:</span>
        <span className="font-bold text-primary-700">{numberFormat(discount)}₫</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">{t("total")}:</span>
        <span className="font-bold text-primary-700">{numberFormat(totalPrice - discount)}₫</span>
      </div>
      <div>
        <p className="text-green-600">* {t("freeShipping")}</p>
      </div>
      <Button onClick={onSubmit} type="submit" className="w-full">
        {t("order")}
      </Button>

      <div className="text-xs font-semibold leading-6 text-gray-400">
        <Trans i18nKey="isAcceptedOrderTerms" t={t}>
          0
          <Link to="/" className="ml-1 underline hover:text-black">
            1
          </Link>
        </Trans>
      </div>
    </div>
  );
};

export default memo(CartOrder);
