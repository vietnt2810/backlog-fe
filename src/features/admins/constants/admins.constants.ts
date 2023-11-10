import { ColumnsType } from "antd/es/table";
import { t } from "i18next";

import { AdminResponse } from "../admins";

export const COLUMNS_ADMINS = (): ColumnsType<AdminResponse> => [
  {
    title: "No",
    dataIndex: "id",
    key: "order",
    align: "left",
    width: 60,
  },
  {
    title: t("table.admins.account_name", { ns: "admin" }),
    dataIndex: "nameFirst",
    key: "nameFirst",
    align: "left",
    width: "18%",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: t("table.admins.email", { ns: "admin" }),
    dataIndex: "email",
    key: "email",
    align: "left",
    ellipsis: {
      showTitle: false,
    },
  },
  {
    title: t("table.admins.created_at", { ns: "admin" }),
    dataIndex: "createdAt",
    key: "createdAt",
    width: "15%",
    align: "left",
  },
  {
    title: t("table.admins.updated_by", { ns: "admin" }),
    dataIndex: "updatedAt",
    key: "updatedAt",
    align: "left",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "right",
  },
];

export const acceptedImageFileTypes: string[] = [
  "image/gif",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/jpeg",
];
