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

export const actionTexts: Record<string, string> = {
  create: "created an issue",
  update: "updated the issue",
  comment: "posted a comment on the issue",
};

export const statusTexts: Record<number, string> = {
  1: "Open",
  2: "In Progress",
  3: "Resolved",
  4: "Pending",
  5: "Closed",
};
