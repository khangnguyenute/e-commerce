import { AUTH_API_PATH } from "@constants/apiConstant";
import { PROFILE_PATH } from "@constants/routeConstant";
import useToast from "@hooks/useToast";
import { userService } from "@services/index";
import { updateUser } from "@slices/commonSlice";
import { baseURL } from "@utils/Axios/instance";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MdEmail, MdPhone, MdLock } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileAccountSecurityItem from "./SecurityItem";

const ProfileAccountSecurity = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const currentUser = useSelector((state) => state.common.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdatePassword = useCallback(() => {
    if (!currentUser?.email) {
      navigate(PROFILE_PATH.EDIT_ACCOUNT("mail"));
      toast.info(t("updatePasswordAlert"));
      return;
    }

    navigate(PROFILE_PATH.EDIT_ACCOUNT("password"));
  }, [currentUser?.email, navigate, t, toast]);

  const handleUpdatePhone = useCallback(() => {
    navigate(PROFILE_PATH.EDIT_ACCOUNT("phone"));
  }, [navigate]);

  const handleUpdateEmail = useCallback(() => {
    navigate(PROFILE_PATH.EDIT_ACCOUNT("mail"));
  }, [navigate]);

  const handleConnectFacebook = async () => {
    if (!currentUser?.facebookId) {
      window.open(`${baseURL}/${AUTH_API_PATH.CONNECT_SOCIAL("facebook", currentUser.userId)}`, "_self");
      return;
    }

    try {
      await userService.updateUserById(currentUser._id, { facebookId: "" });
      toast.success(t("disconnectFacebookSuccessfully"));

      dispatch(updateUser({ facebookId: "" }));
    } catch (error) {
      toast.error(t("unknown"));
    }
  };

  const handleConnectGoolge = async () => {
    if (!currentUser?.googleId) {
      window.open(`${baseURL}/${AUTH_API_PATH.CONNECT_SOCIAL("google", currentUser.userId)}`, "_self");
      return;
    }

    try {
      await userService.updateUserById(currentUser._id, { googleId: "" });
      toast.success(t("disconnectGoogleSuccessfully"));

      dispatch(updateUser({ googleId: "" }));
    } catch (error) {
      toast.error(t("unknown"));
    }
  };

  return (
    <div className="flex flex-col space-y-4 text-slate-700">
      <div className="font-semibold">{t("phoneAndEmail")}</div>
      <ProfileAccountSecurityItem
        icon={<MdPhone size={24} />}
        label={t("phone")}
        value={currentUser?.phone ?? t("unavailablePhone")}
        buttonContent={t("update")}
        onUpdate={handleUpdatePhone}
      />
      <ProfileAccountSecurityItem
        icon={<MdEmail size={24} />}
        label={t("email")}
        value={currentUser?.email ?? t("unavailableEmail")}
        buttonContent={t("update")}
        onUpdate={handleUpdateEmail}
      />

      <div className="font-semibold">{t("security")}</div>
      <ProfileAccountSecurityItem
        icon={<MdLock size={24} />}
        label={t("password")}
        buttonContent={t("update")}
        onUpdate={handleUpdatePassword}
      />

      <span className="font-semibold ">{t("socialNetworkConnection")}</span>
      <ProfileAccountSecurityItem
        icon={<FaFacebook size={24} className="text-blue-600" />}
        label={t("facebook")}
        buttonContent={currentUser?.facebookId ? t("disconnect") : t("connect")}
        onUpdate={handleConnectFacebook}
      />
      <ProfileAccountSecurityItem
        icon={<FcGoogle size={24} />}
        label={t("google")}
        buttonContent={currentUser?.googleId ? t("disconnect") : t("connect")}
        onUpdate={handleConnectGoolge}
      />
    </div>
  );
};

export default memo(ProfileAccountSecurity);
