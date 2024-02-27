import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import AdminUserModificationModal from "./Components/ModificationModal";
import AdminUserHeaderAction from "./Components/HeaderAction";
import AdminUserTable from "./Components/Table";
import { userService } from "@services/index";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "@common/Components/Modal";
import useToast from "@hooks/useToast";

const AdminUserManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedUser = useMemo(() => {
    return userData.find((item) => item._id === selectedUserId) ?? null;
  }, [selectedUserId, userData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedUserId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedUserId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await userService.getUsers(queryParams);

      setUserData(data);
      setIsLoading(false);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    }
  }, [queryParams, t, toast]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedUser) {
      return;
    }

    try {
      await userService.deleteUserById(selectedUser?._id);

      toast.success(t("deleteUserSuccessfully"));
      fetchData();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedUser, t, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedUserId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDocumentTitle(t("userManagement"));

  return (
    <ContentWrapper
      title={t("userManagement")}
      actions={<AdminUserHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminUserTable
        data={userData}
        isLoading={isLoading}
        totalRows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
      />

      <ConfirmationModal
        title={t("deleteUser", { name: selectedUser?.fullname })}
        message={t("deleteUserMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <AdminUserModificationModal
        isOpen={isShowModificationModal}
        user={selectedUser}
        onCreate={userService.createUser}
        onCreated={fetchData}
        onEdit={userService.updateUserById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default memo(AdminUserManagement);
