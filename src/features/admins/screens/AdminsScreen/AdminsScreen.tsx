import { memo, useMemo, useState } from "react";

import {
  Form,
  Affix,
  Card,
  Dropdown,
  Pagination,
  PaginationProps,
  Space,
  Table,
  Tooltip,
} from "antd";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import { confirmPrompt } from "@/components/organisms/ConfirmPrompt/ConfirmPrompt";
import { OPTION_PER_PAGE } from "@/constants/constants";
import { formatDate } from "@/utils/date";
import { handleErrorSubmitted } from "@/utils/utils";

import styles from "./AdminsScreen.module.scss";
import {
  AdminResponse,
  AdminsPathsEnum,
  COLUMNS_ADMINS,
  EditAdminRequestBody,
} from "../../admins";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import useDeleteAdmin from "../../hooks/useDeleteAdmin";
import useEditAdmin from "../../hooks/useEditAdmin";
import useGetAdmins from "../../hooks/useGetAdmins";

const AdminsScreen = () => {
  const [form] = Form.useForm();
  const { t: tAdmin } = useTranslation("admin");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [perPageCurrent, setPerPageCurrent] = useState<number>(
    Number(searchParams.get("per_page")) || 10
  );
  const [isOpenModalChangePassword, setIsOpenModalChangePassword] =
    useState<boolean>(false);
  const [idTableRow, setIdTableRow] = useState<number>();
  const { editAdmin } = useEditAdmin();

  const { admins, isGetAdminsFetching, refetchGetAdmins } = useGetAdmins({
    page,
    perPage: perPageCurrent,
  });

  const { deleteAdmin, isDeleteLoading } = useDeleteAdmin();
  const adminsData = useMemo(() => {
    return admins?.data?.map(item => ({
      ...item,
      key: item.id,
      id: item.id,
      nameFirst: (
        <Tooltip
          placement="topLeft"
          title={`${item.nameFamily} ${item.nameFirst}`}
        >{`${item.nameFamily} ${item.nameFirst}`}</Tooltip>
      ),
      email: (
        <Tooltip placement="topLeft" title={item.email}>
          {item.email}
        </Tooltip>
      ),
      createdAt: formatDate(item.createdAt),
      updatedAt: formatDate(item.updatedAt),
      action: !item.isLoging && (
        <Dropdown
          menu={{
            items: [
              {
                label: tAdmin("button.edit"),
                key: "0",
                onClick: () =>
                  navigate(
                    AdminsPathsEnum.EDIT_ADMIN.replace(
                      ":adminId",
                      item.id.toString()
                    )
                  ),
              },
              {
                label: tAdmin("button.change_password"),
                key: "1",
                onClick: () => {
                  setIdTableRow(item.id);
                  setIsOpenModalChangePassword(true);
                },
              },
              {
                label: tAdmin("button.delete"),
                key: "3",
                onClick: () => {
                  setIdTableRow(item.id);
                  confirmPrompt({
                    isShowTitle: false,
                    content: t("modal_confirm.delete_content"),
                    onOk: () => {
                      deleteAdmin(item.id).then(() => {
                        refetchGetAdmins();
                      });
                    },
                    onCancel: () => {
                      setIdTableRow(undefined);
                    },
                  });
                },
              },
            ],
          }}
          trigger={["click"]}
        >
          <Space>
            <span className="icon-down-square" />
          </Space>
        </Dropdown>
      ),
    }));
  }, [admins?.data, deleteAdmin, navigate, refetchGetAdmins, t, tAdmin]);

  const handleChangePageAdmins = (pageNumber: number, perPageCurr: number) => {
    searchParams.set("page", pageNumber.toString());
    searchParams.set("per_page", perPageCurr.toString());
    setSearchParams(searchParams);
  };

  const handleShowSizeChange: PaginationProps["onShowSizeChange"] = (
    _,
    pageSize
  ) => {
    setPerPageCurrent(pageSize);
  };

  const setColorTableRow = (record: AdminResponse) => {
    const activeRowClassName = "active-row";
    if (record.id === idTableRow) {
      return activeRowClassName;
    }
    return "";
  };

  const handelChangePassword = (value: EditAdminRequestBody) => {
    editAdmin({ id: idTableRow, password: value.password })
      .then(() => setIsOpenModalChangePassword(false))
      .catch(err => handleErrorSubmitted(form, err));
  };
  return (
    <>
      <Card className={cx(styles.root)}>
        <Table
          dataSource={adminsData}
          columns={COLUMNS_ADMINS()}
          pagination={false}
          className="flex-1"
          scroll={{ x: 1000 }}
          loading={isGetAdminsFetching || isDeleteLoading}
          rowClassName={setColorTableRow}
          title={() => (
            <Button
              type="primary"
              onClick={() => navigate(AdminsPathsEnum.CREATE_ADMIN)}
            >
              {tAdmin("button.create")}
            </Button>
          )}
        />
        <Affix offsetBottom={0}>
          <div>
            {!!admins?.data?.length && admins?.meta?.totalRecord && (
              <Pagination
                current={page || 1}
                showSizeChanger
                total={admins?.meta.totalRecord}
                locale={{
                  items_per_page: `/ ${t("pagination.items_per_page")}`,
                }}
                pageSizeOptions={OPTION_PER_PAGE}
                pageSize={perPageCurrent}
                showLessItems
                showTotal={() =>
                  `${admins?.data.length}/${admins?.meta.totalRecord}`
                }
                onChange={(pageNumber, perPageCurr) =>
                  handleChangePageAdmins(pageNumber, perPageCurr)
                }
                onShowSizeChange={handleShowSizeChange}
              />
            )}
          </div>
        </Affix>
      </Card>
      {isOpenModalChangePassword && (
        <ChangePasswordModal
          isOpen={isOpenModalChangePassword}
          onCancel={() => {
            setIsOpenModalChangePassword(false);
            setIdTableRow(undefined);
          }}
          onFinish={handelChangePassword}
        />
      )}
    </>
  );
};
export default memo(AdminsScreen);
