import { Typography } from "antd";
import cx from "classnames";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

import { IssuePaths } from "@/features/issue/constants/issue.paths";

import styles from "./RecentUpdateItem.module.scss";
import { actionTexts, statusTexts } from "../../constants/project.constants";
import { RecentUpdateItemType } from "../../types/project.types";

interface RecentUpdateItemProps {
  recentUpdateItem: RecentUpdateItemType;
}

const RecentUpdateItem = ({ recentUpdateItem }: RecentUpdateItemProps) => {
  const navigate = useNavigate();
  const { projectId, subProjectId } = useParams();

  const getRecentUpdateActionText = (actionType: string) => {
    return actionTexts[actionType];
  };

  return (
    <div className={cx(styles.recentUpdateItem, "mb-5")}>
      <Typography className="recentUpdateDate font-weight-half-bold">
        {dayjs(recentUpdateItem.createdAt).format("ddd MMM. DD, YYYY HH:mm")}
      </Typography>
      <div className="recentUpdateContent">
        {recentUpdateItem.creatorAvatarUrl ? (
          <img
            alt="avatar"
            src={recentUpdateItem.creatorAvatarUrl}
            className="avatar"
          />
        ) : (
          <div className="avatar flex-center">
            {recentUpdateItem.creatorUsername.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="ml-2">
          <div className="mt-3">
            <Typography.Text className="text-pink font-weight-half-bold">
              {`${recentUpdateItem.creatorUsername} `}
            </Typography.Text>
            <Typography.Text className="font-weight-half-bold">{`${getRecentUpdateActionText(
              recentUpdateItem.updateType
            )}`}</Typography.Text>
          </div>
          <div className="mt-2">
            <Typography.Text
              onClick={() =>
                navigate(
                  IssuePaths.ISSUE_DETAIL(
                    String(projectId),
                    String(subProjectId ?? recentUpdateItem.subProjectId),
                    String(recentUpdateItem.issueId)
                  )
                )
              }
              className="text-pink font-weight-half-bold cursor-pointer hoverTextUnderline"
            >
              {recentUpdateItem.issueKey}
            </Typography.Text>
            <Typography.Text className="ml-2 font-weight-half-bold word-break-all">
              {recentUpdateItem.issueSubject}
            </Typography.Text>
          </div>
          <div className="mt-1">
            <Typography className="text-dark-30 font-13">{`[ Status: ${
              statusTexts[recentUpdateItem.newStatus]
            } ] [ Assignee: ${
              recentUpdateItem.assigneeUsername
            } ]`}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUpdateItem;
