import { ColumnsType } from "antd/es/table";

export const ISSUES_STATUSES = [
  {
    name: "All",
    value: "",
  },
  {
    name: "Open",
    value: "1",
  },
  {
    name: "In Progress",
    value: "2",
  },
  {
    name: "Resolved",
    value: "3",
  },
  {
    name: "Pending",
    value: "4",
  },
  {
    name: "Closed",
    value: "5",
  },
];

export const ISSUES_TABLE_COLUMNS: ColumnsType<any> = [
  {
    title: "Issue Type",
    dataIndex: "issueType",
    width: "100px",
    align: "center",
  },
  {
    title: "Key",
    dataIndex: "issueKey",
    width: "125px",
    align: "center",
  },
  {
    title: "Subject",
    dataIndex: "subject",
    width: "300px",
  },
  {
    title: "Assignee",
    dataIndex: "assignee",
    width: "150px",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "95px",
    align: "center",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    width: "80px",
    align: "center",
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    width: "125px",
    align: "center",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    width: "125px",
    align: "center",
  },
  {
    title: "Due Date",
    dataIndex: "dueDate",
    width: "125px",
    align: "center",
  },
  {
    title: "Estimated Hours",
    dataIndex: "estimatedHour",
    width: "100px",
  },
  {
    title: "Actual Hours",
    dataIndex: "actualHour",
    width: "100px",
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdatedAt",
    width: "125px",
    align: "center",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    width: "150px",
  },
];
