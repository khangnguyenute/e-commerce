import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "@services/index";
import { CLIENT_PATH, PROFILE_PATH } from "@constants/routeConstant";
import useToast from "@hooks/useToast";
import { clearCart, setUser } from "@slices/commonSlice";
import HeaderUserDropdownItem from "./HeaderUserDropdownItem";
import { MdLocationOn, MdOutlineFavorite, MdOutlineListAlt, MdOutlineLogout } from "react-icons/md";

const HeaderUserDropdownMenu = ({ onClick }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.common.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClickLogout = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      await authService.logOut();
      dispatch(setUser(undefined));
      dispatch(clearCart());
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsSubmitting(false);
      navigate(CLIENT_PATH.HOME);
    }
  }, [dispatch, isSubmitting, navigate, t, toast]);

  const handleClickDashboard = useCallback(() => {
    navigate(CLIENT_PATH.HOME);
  }, [navigate]);

  return (
    <div className="flex flex-col space-y-3">
      <HeaderUserDropdownItem
        className="border-b-2 border-gray-100 pb-3"
        path={PROFILE_PATH.ACCOUNT}
        onClick={onClick}
      >
        {user?.email}
      </HeaderUserDropdownItem>
      <HeaderUserDropdownItem path={PROFILE_PATH.ORDER_HISTORY} onClick={handleClickDashboard}>
        <MdOutlineListAlt size={20} />
        <p>{t("orderHistory")}</p>
      </HeaderUserDropdownItem>
      <HeaderUserDropdownItem path={PROFILE_PATH.ADDRESS} onClick={handleClickDashboard}>
        <MdLocationOn size={20} />
        <p>{t("address")}</p>
      </HeaderUserDropdownItem>
      <HeaderUserDropdownItem path={PROFILE_PATH.FAVORITE} onClick={handleClickDashboard}>
        <MdOutlineFavorite size={20} />
        <p>{t("favorite")}</p>
      </HeaderUserDropdownItem>
      <HeaderUserDropdownItem className="border-t-2 border-gray-100 pt-3" onClick={handleClickLogout}>
        {isSubmitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border border-slate-700 border-t-transparent" />
        ) : (
          <MdOutlineLogout size={20} />
        )}
        <p>{t("logOut")}</p>
      </HeaderUserDropdownItem>
    </div>
  );
};
export default memo(HeaderUserDropdownMenu);
