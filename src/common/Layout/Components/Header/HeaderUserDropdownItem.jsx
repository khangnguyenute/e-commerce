import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiHelpCircle, FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "@services/index";
import { ADMIN_PATH, CLIENT_PATH, PROFILE_PATH } from "@constants/routeConstant";
import useToast from "@hooks/useToast";
import { clearCart, setUser } from "@slices/commonSlice";

const HeaderUserDropdownItem = ({ onClick }) => {
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
    if (user.role === "admin") {
      navigate(ADMIN_PATH.HOME);
      return;
    }
    navigate(CLIENT_PATH.HOME);
  }, [navigate, user.role]);

  return (
    <>
      <div className="group flex w-full cursor-pointer" role="button" tabIndex={0} onClick={onClick}>
        <div className="mb-3 h-full w-full border-b-2 border-gray-100 pb-4 text-sm">
          <Link to={PROFILE_PATH.ACCOUNT} className="font-semibold group-hover:text-primary-500">
            {user?.fullName}
          </Link>
          <Link
            to={PROFILE_PATH.ACCOUNT}
            className="mt-1 line-clamp-1 break-all text-sm group-hover:text-primary-500"
          >
            {user?.email}
          </Link>
        </div>
      </div>
      <div
        className="mt-1 flex w-full items-center hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={handleClickDashboard}
      >
        <FiSettings />
        <div className="ml-3 text-sm">
          <div>{t("dashboard")}</div>
        </div>
      </div>
      <div
        className="mt-2 flex w-full items-center hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <FiHelpCircle />
        <Link to="help">
          <p className="ml-3 text-sm">{t("helpAndContact")}</p>
        </Link>
      </div>
      <div
        className="mt-4 flex w-full items-center border-t-2 border-gray-100 pt-3 hover:text-red-600"
        role="button"
        tabIndex={0}
        onClick={handleClickLogout}
      >
        {isSubmitting ? (
          <div className="h-4 w-4 animate-spin rounded-full border border-slate-700 border-t-transparent" />
        ) : (
          <FiLogOut />
        )}
        <div className="ml-3 text-sm">{t("logOut")}</div>
      </div>
    </>
  );
};
export default memo(HeaderUserDropdownItem);
