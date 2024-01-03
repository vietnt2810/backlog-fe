/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useEffect, useMemo } from "react";

import { Input, Select, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { ReactComponent as HighPriorityIcon } from "@/assets/images/highPriorityArrow.svg";
import { ReactComponent as LowPriorityIcon } from "@/assets/images/lowPriorityArrow.svg";
import { ReactComponent as NormalPriorityIcon } from "@/assets/images/normalPriorityArrow.svg";
import Form, { Item } from "@/components/atoms/Form/Form";
import useGetProjectMembers from "@/features/project/hooks/useGetProjectMembers";
import { tableStatusTexts } from "@/features/project/screens/ProjectHomepageScreen/ProjectHomepageScreen";

import styles from "./IssuesScreen.module.scss";
import useGetMasterIssueTypes from "../../../settings/hooks/useGetMasterIssueTypes";
import {
  ISSUES_STATUSES,
  ISSUES_TABLE_COLUMNS,
} from "../../constants/issue.constants";
import { IssuePaths } from "../../constants/issue.paths";
import useGetIssues from "../../hooks/useGetIssues";

const IssuesScreen = () => {
  const navigate = useNavigate();
  const { projectId, subProjectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { projectMembers } = useGetProjectMembers(String(projectId));
  const { masterIssueTypes } = useGetMasterIssueTypes(String(projectId));
  const { issues, isIssuesLoading, refetchIssues } = useGetIssues(
    String(subProjectId),
    {
      keyword: searchParams.get("keyword"),
      status: searchParams.get("status"),
      type: searchParams.get("type"),
      assigneeId: searchParams.get("assigneeId"),
      page: searchParams.get("page"),
    }
  );

  const memberOptions = useMemo(() => {
    return projectMembers?.data.map(member => {
      return {
        label: (
          <div className={styles.selectOption}>
            {member?.user?.avatarUrl ? (
              <img
                alt="avatar"
                src={member?.user?.avatarUrl}
                className={styles.memberAvatarOption}
              />
            ) : (
              <div className={styles.memberAvatarOption} />
            )}

            <Typography.Text
              title={member?.username}
              className="ml-2 text-ellipsis"
            >
              {member?.username}
            </Typography.Text>
          </div>
        ),
        value: member?.userId,
      };
    });
  }, [projectMembers]);

  const issuesTableData = useMemo(() => {
    return issues?.data.map(issue => ({
      ...issue,
      issueType: (
        <div
          className="issueType text-white"
          style={{ background: issue.issueTypeColor }}
        >
          {issue.issueType}
        </div>
      ),
      issueKey: (
        <Typography
          onClick={() =>
            navigate(
              IssuePaths.ISSUE_DETAIL(
                String(projectId),
                String(subProjectId),
                String(issue.id)
              )
            )
          }
          className="issueKey"
        >
          {issue.issueKey}
        </Typography>
      ),
      assignee: (
        <div className="d-flex">
          {issue.assigneeAvatarUrl ? (
            <img
              src={issue.assigneeAvatarUrl}
              alt="avatar"
              className="avatar"
            />
          ) : (
            <div className="avatar flex-center font-12">
              {issue?.assigneeUsername.charAt(0).toUpperCase()}
            </div>
          )}
          <Typography.Text className="ml-2">
            {issue.assigneeUsername}
          </Typography.Text>
        </div>
      ),
      status: tableStatusTexts[issue.status],
      priority:
        // eslint-disable-next-line no-nested-ternary
        issue.priority === 1 ? (
          <HighPriorityIcon className="priorityIcon" />
        ) : issue.priority === 2 ? (
          <NormalPriorityIcon className="priorityIcon" />
        ) : (
          <LowPriorityIcon className="priorityIcon" />
        ),
      createdAt: issue.createdAt
        ? dayjs(issue.createdAt).format("MMM DD, YYYY")
        : "",
      startDate: issue.startDate
        ? dayjs(issue.startDate).format("MMM DD, YYYY")
        : "",
      dueDate: issue.dueDate ? dayjs(issue.dueDate).format("MMM DD, YYYY") : "",
      lastUpdatedAt: issue.lastUpdatedAt
        ? dayjs(issue.lastUpdatedAt).format("MMM DD, YYYY")
        : "",
      creator: (
        <div className="d-flex">
          {issue.creatorAvatarUrl ? (
            <img src={issue.creatorAvatarUrl} alt="avatar" className="avatar" />
          ) : (
            <div className="avatar flex-center font-12">
              {issue?.creatorUsername.charAt(0).toUpperCase()}
            </div>
          )}
          <Typography.Text className="ml-2">
            {issue.creatorUsername}
          </Typography.Text>
        </div>
      ),
    }));
  }, [issues, navigate, projectId, subProjectId]);

  useEffect(() => {
    refetchIssues();
  }, [refetchIssues, searchParams]);

  return (
    <div className={styles.container}>
      <Typography className="font-16 font-weight-half-bold">
        Search conditions
      </Typography>
      <div className="flex-align-center mt-5">
        <Typography className="font-weight-half-bold">Status:</Typography>
        {ISSUES_STATUSES.map(status => (
          <div
            key={status.value}
            onClick={() => {
              searchParams.set("status", status.value);
              setSearchParams(searchParams);
            }}
            className={"status text-dark ml-3 font-14 cursor-pointer".concat(
              status.value === searchParams.get("status") ? " activeStatus" : ""
            )}
          >
            {status.name}
          </div>
        ))}
      </div>
      <Form layout="vertical" className="searchForm mt-5 flex-align-center">
        <Item label="Issue Type" className="selectItem">
          <Select
            allowClear
            onChange={typeValue => {
              typeValue
                ? searchParams.set("type", typeValue)
                : searchParams.delete("type");
              setSearchParams(searchParams);
            }}
            options={masterIssueTypes?.map(type => {
              return {
                label: type.issueType,
                value: type.id,
              };
            })}
          />
        </Item>
        <Item label="Assignee" className="selectItem ml-5">
          <Select
            allowClear
            onChange={assigneeId => {
              assigneeId
                ? searchParams.set("assigneeId", assigneeId)
                : searchParams.delete("assigneeId");
              setSearchParams(searchParams);
            }}
            options={memberOptions}
          />
        </Item>
        <Item label="Keyword" className="ml-5">
          <Input
            onPressEnter={(e: any) => {
              e.target.value
                ? searchParams.set("keyword", e.target.value)
                : searchParams.delete("keyword");
              setSearchParams(searchParams);
            }}
            placeholder="Enter keyword"
          />
        </Item>
      </Form>
      <Table
        loading={isIssuesLoading}
        className="issuesTable"
        dataSource={issuesTableData}
        columns={ISSUES_TABLE_COLUMNS}
        rowKey="id"
        pagination={{
          current: issues?.meta.page ? Number(issues?.meta.page) : 1,
          total: issues?.meta.totalRecord,
          pageSize: 20,
          position: ["topLeft", "bottomLeft"],
          onChange: e => {
            searchParams.set("page", String(e));
            setSearchParams(searchParams);
          },
        }}
      />
    </div>
  );
};

export default memo(IssuesScreen);
