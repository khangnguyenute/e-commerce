import { createColumnHelper } from "@tanstack/react-table";
import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { capitalize, get, omit } from "lodash";

import AdminUserTableRowAction from "./TableRowAction";
import AdminUserRole from "./Role";
import { BooleanEnum, UserRoleEnum } from "@constants/enumConstant";
import { Avatar, Table, Toggle } from "@common/Components";

const AdminUserTable = ({ data, isLoading, onClickEdit, onClickDelete, ...props }) => {
  const { t } = useTranslation();

  const getAllRoles = useCallback(() => {
    return Object.values(UserRoleEnum).map((role) => ({
      value: role,
      label: role,
    }));
  }, []);

  const getBoolean = useCallback(() => {
    return Object.values(BooleanEnum).map((boolean) => ({
      value: boolean,
      label: boolean,
    }));
  }, []);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.userId, {
        id: "_id",
        header: t("id"),
      }),
      columnHelper.accessor((row) => row.image, {
        id: "image",
        header: t("avatar"),
        cell: (props) => <Avatar src={props.row.original.image} alt={props.row.original.email} />,
      }),
      columnHelper.accessor((row) => row.fullname, {
        id: "fullname",
        header: t("fullname"),
      }),
      columnHelper.accessor((row) => row.email, {
        id: "email",
        header: t("email"),
      }),
      columnHelper.accessor((row) => row.phone, {
        id: "phone",
        header: t("phone"),
      }),
      columnHelper.accessor((row) => row.role, {
        id: "role",
        header: t("role"),
        cell: (props) => <AdminUserRole role={props.row.original?.role} />,
        meta: {
          filterBy: "role",
          filterValueBy: "value",
          filterLabel: t("role"),
          filterType: "enum",
          getFilterOptions: getAllRoles,
          filterOptionLabelFactory: (option) => capitalize(get(option, "label")),
        },
      }),
      columnHelper.accessor((row) => row.address?.address?.[0], {
        id: "address",
        header: t("address"),
        cell: (props) => (
          <div className="w-[200px] whitespace-normal break-words">
            {props.row.original?.address[0]?.address}
          </div>
        ),
      }),
      columnHelper.accessor((row) => row.verifyMail, {
        id: "verifyMail",
        header: t("verifyMail"),
        cell: (props) => (
          <div className="flex items-center justify-center">
            <Toggle isOn={props.row.original.verifyMail} disable />
          </div>
        ),
        meta: {
          filterBy: "verifyMail",
          filterValueBy: "value",
          filterLabel: t("verifyMail"),
          filterType: "enum",
          getFilterOptions: getBoolean,
          filterOptionLabelFactory: (option) => capitalize(get(option, "label")),
        },
      }),
      columnHelper.accessor((row) => row.verifyPhone, {
        id: "verifyPhone",
        header: t("verifyPhone"),
        cell: (props) => (
          <div className="flex items-center justify-center">
            <Toggle isOn={props.row.original.verifyPhone} disable />
          </div>
        ),
        meta: {
          filterBy: "verifyPhone",
          filterValueBy: "value",
          filterLabel: t("verifyPhone"),
          filterType: "enum",
          getFilterOptions: getBoolean,
          filterOptionLabelFactory: (option) => capitalize(get(option, "label")),
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <AdminUserTableRowAction
            id={props.row.original._id}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ),
      }),
    ],
    [columnHelper, getAllRoles, getBoolean, onClickDelete, onClickEdit, t],
  );

  const searchGroup = useMemo(
    () => [
      {
        key: "information",
        label: t("information"),
        field: {
          fullname: t("fullname"),
          email: t("email"),
        },
      },
    ],
    [t],
  );

  return (
    <Table
      data={data}
      columns={columns}
      searchGroup={searchGroup}
      isLoading={isLoading}
      {...omit(props, "columns")}
    />
  );
};

export default memo(AdminUserTable);
