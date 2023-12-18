/* eslint-disable no-nested-ternary */
import { memo } from "react";

import { Typography } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import { ReactComponent as HighPriorityIcon } from "@/assets/images/highPriorityArrow.svg";
import { ReactComponent as LowPriorityIcon } from "@/assets/images/lowPriorityArrow.svg";
import { ReactComponent as NormalPriorityIcon } from "@/assets/images/normalPriorityArrow.svg";
import Loader from "@/components/organisms/Loader/Loader";

import styles from "./IssueDetailScreen.module.scss";
import useGetIssueDetail from "../../hooks/useGetIssueDetail";

const IssueDetailScreen = () => {
  const { issueId } = useParams();

  const tableStatusTexts: Record<number, React.ReactNode> = {
    1: <div className="bg-status-color-1 status">Open</div>,
    2: <div className="bg-status-color-2 status">In progress</div>,
    3: <div className="bg-status-color-3 status">Resolved</div>,
    4: <div className="bg-status-color-4 status">Pending</div>,
    5: <div className="bg-status-color-5 status">Closed</div>,
  };

  const { isGetIssueDetailLoading, issueDetail } = useGetIssueDetail(
    String(issueId)
  );

  if (isGetIssueDetailLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className="flex-space-between">
        <div className="d-flex">
          <Typography.Text className="issueType flex-align-center">
            {issueDetail?.issueType}
          </Typography.Text>
          <Typography.Text className="ml-1">
            {issueDetail?.issueKey}
          </Typography.Text>
        </div>
        <div className="flex-align-baseline">
          <Typography.Text className="font-13 text-dark-30">
            Start Date
          </Typography.Text>
          <Typography.Text className="ml-1">
            {issueDetail?.startDate
              ? dayjs(issueDetail?.startDate).format("ddd MMM. DD, YYYY")
              : ""}
          </Typography.Text>
          <Typography.Text className="mx-1">-</Typography.Text>
          <Typography.Text className="font-13 text-dark-30">
            Due Date
          </Typography.Text>
          <Typography.Text className="ml-1 mr-3">
            {issueDetail?.dueDate
              ? dayjs(issueDetail?.dueDate).format("ddd MMM. DD, YYYY")
              : ""}
          </Typography.Text>
          {tableStatusTexts[Number(issueDetail?.status)]}
        </div>
      </div>
      <Typography className="font-20 font-weight-bold mt-2">
        {issueDetail?.subject}
      </Typography>
      <div className="issueDetailBox mt-2">
        <div className="flex-align-center">
          {issueDetail?.creatorAvatarUrl ? (
            <img
              alt="avatar"
              src={issueDetail.creatorAvatarUrl}
              className="creatorAvatar"
            />
          ) : (
            <div className="creatorAvatar">
              {issueDetail?.creatorUsername.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="ml-2">
            <Typography className="font-weight-bold">
              {issueDetail?.creatorUsername}
            </Typography>
            <Typography className="text-dark-30 font-13">{`Created ${dayjs(
              issueDetail?.createdAt
            ).format("ddd MMM. DD, YYYY HH:mm:ss")}`}</Typography>
          </div>
        </div>
        <Typography className="font-weight-half-bold mt-2">
          Description
        </Typography>
        <Typography>
          <pre>{issueDetail?.description}</pre>
        </Typography>
        <div className="flex-space-between mt-2">
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Priority</Typography>
            {issueDetail?.priority === 1 ? (
              <div className="flex-align-center">
                <HighPriorityIcon className="priorityIcon" />
                <Typography.Text className="priorityText">High</Typography.Text>
              </div>
            ) : issueDetail?.priority === 2 ? (
              <div className="flex-align-center">
                <NormalPriorityIcon className="priorityIcon" />
                <Typography.Text className="priorityText">
                  Normal
                </Typography.Text>
              </div>
            ) : (
              <div className="flex-align-center">
                <LowPriorityIcon className="priorityIcon" />
                <Typography.Text className="priorityText">Low</Typography.Text>
              </div>
            )}
          </div>
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Assignee</Typography>
            <div className="flex-align-center">
              {issueDetail?.assigneeAvatarUrl ? (
                <img
                  alt="avatar"
                  src={issueDetail.assigneeAvatarUrl}
                  className="assigneeAvatar"
                />
              ) : (
                <div className="assigneeAvatar flex-center font-13">
                  {issueDetail?.assigneeUsername.charAt(0).toUpperCase()}
                </div>
              )}
              <Typography className="ml-2">
                {issueDetail?.assigneeUsername}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex-space-between mt-2">
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Estimated Hours</Typography>
            <Typography>{issueDetail?.estimatedHour}</Typography>
          </div>
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Actual Hours</Typography>
            <Typography>{issueDetail?.estimatedHour}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(IssueDetailScreen);
