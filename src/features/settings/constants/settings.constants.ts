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
    title: "Action",
    dataIndex: "action",
    width: "80px",
    align: "center",
  },
];

export const ISSUE_TYPES_TABLE_COLUMNS: ColumnsType<any> = [
  {
    title: "List of Issue Types",
    dataIndex: "issueType",
    width: "200px",
  },
  {
    title: "Action",
    dataIndex: "action",
    width: "50px",
    align: "center",
  },
];
