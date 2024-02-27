import { AiOutlinePlus } from "react-icons/ai";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { userService } from "@services/index";
import AddressItem from "./Item";
import { ConfirmationModal } from "@common/Components";
import ProfileAddressModificationModal from "./ModificationModal";
import useToast from "@hooks/useToast";
import useDocumentTitle from "@hooks/useDocumentTitle";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

const ProfileAddress = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const user = useSelector((state) => state.common.user);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const selectedAddress = useMemo(() => {
    if (!user || isEmpty(user.address)) {
      return null;
    }
    return user.address.find((addressItem) => addressItem?.mnemonicName === selectedAddressId) ?? null;
  }, [selectedAddressId, user]);

  const handleClickAdd = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEdit = useCallback((addressItem) => {
    setSelectedAddressId(addressItem.mnemonicName ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDelete = useCallback((addressItem) => {
    setSelectedAddressId(addressItem.mnemonicName ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!selectedAddress) {
      return;
    }

    try {
      await userService.deleteAddress(user._id, selectedAddress);

      toast.success(t("deleteAddressSuccessfully"));
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [selectedAddress, user._id, toast, t]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setSelectedAddressId(null);
  }, []);

  useDocumentTitle(t("address"));

  return (
    <div>
      <div className="text-xl font-semibold">{t("address")}</div>
      <div
        role="button"
        tabIndex={0}
        className="my-6 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed py-6 text-blue-500 hover:text-blue-700"
        onClick={handleClickAdd}
      >
        <AiOutlinePlus size={20} />
        <span>{t("addNew")}</span>
      </div>

      {user?.address.map((addressItem, index) => (
        <AddressItem
          key={index}
          index={index}
          addressItem={addressItem}
          onClickEdit={handleClickEdit}
          onClickDelete={handleClickDelete}
        />
      ))}

      <ConfirmationModal
        message={t("deleteAddressMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        title={t("deleteAddress")}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />

      <ProfileAddressModificationModal
        isOpen={isShowModificationModal}
        selectedAddress={selectedAddress}
        onCreate={userService.addAddress}
        onEdit={userService.editAddress}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default memo(ProfileAddress);
