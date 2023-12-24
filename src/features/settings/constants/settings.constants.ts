import { ColumnsType } from "antd/es/table";

export const MEMBER_ROLE_OPTIONS = [
  {
    label: "All roles",
    value: "",
  },
  {
    label: "Administrator",
    value: "1",
  },
  {
    label: "Member",
    value: "0",
  },
];

export const MEMBER_TABLE_COLUMNS: ColumnsType<any> = [
  {
    title: "Username",
    dataIndex: "username",
    width: "200px",
  },
  {
    title: "Role",
    dataIndex: "role",
    width: "100px",
    align: "center",
  },
  {
    title: "Joined on",
    dataIndex: "joinedDate",
    width: "200px",
    align: "center",
  },
  {
    title: " ",
    dataIndex: "action",
    width: "80px",
    align: "center",
  },
];
