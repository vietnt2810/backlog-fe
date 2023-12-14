import { ColumnsType } from "antd/es/table";

export const USER_ISSUES_TABLE_COLUMNS: ColumnsType<any> = [
  {
    title: "Key",
    dataIndex: "issueKey",
    width: "105px",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    width: "280px",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    width: "80px",
    align: "center",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "130px",
    align: "center",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    width: "80px",
  },
];
