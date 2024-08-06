import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsCameraFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, Input, profileFormSchema } from "@common/Components";
import { userService } from "@services/index";
import ProfileAccountModificationModal from "./ModificationModal";
import useToast from "@hooks/useToast";
import { useTranslation } from "react-i18next";
import { updateUser } from "@slices/commonSlice";
import { pick } from "lodash";

const ProfileAccountInformation = ({ className }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.common.user);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);

  const {
    control,
    reset,
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(profileFormSchema(t)),
  });

  const handleCloseShowModal = useCallback(() => {
    setIsShowModificationModal(false);
  }, []);

  const handleShowChangeProfileModal = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleSubmit = useFormSubmit(async (formData) => {
    if (!currentUser) {
      return;
    }

    setIsSubmitting(true);

    try {
      await userService.updateUserById(currentUser._id, pick(formData, "fullname"));
      toast.success(t("editAccountSuccessfully"));

      dispatch(updateUser(pick(formData, "fullname")));
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    setIsSubmitting(false);

    if (currentUser) {
      reset(currentUser);
      return;
    }
  }, [currentUser, reset]);

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        className="relative mx-auto mb-6 w-fit"
        onClick={handleShowChangeProfileModal}
      >
        <Avatar
          src={currentUser?.image}
          alt={currentUser?.fullname}
          className="h-32 w-32"
          imageClassName="h-32 w-32"
        />
        <div className="absolute bottom-0 right-0">
          <BsCameraFill size={24} className="mr-2 text-slate-700" />
        </div>
      </div>

      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label={t("fullname")}
          name="fullname"
          isRequired
        />
        <Input className="block" control={control} disabled label={t("email")} name="email" isRequired />
        <Button size="sm" disabled={isSubmitting} isLoading={isSubmitting}>
          {t("update")}
        </Button>
      </form>

      <ProfileAccountModificationModal
        isOpen={isShowModificationModal}
        currentUser={currentUser}
        onClose={handleCloseShowModal}
      />
    </div>
  );
};

export default memo(ProfileAccountInformation);
