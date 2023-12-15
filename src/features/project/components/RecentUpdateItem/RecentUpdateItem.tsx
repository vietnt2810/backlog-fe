import { Typography } from "antd";
import cx from "classnames";
import dayjs from "dayjs";

import styles from "./RecentUpdateItem.module.scss";
import { actionTexts, statusTexts } from "../../constants/project.constants";
import { RecentUpdateItemType } from "../../types/project.types";

interface RecentUpdateItemProps {
  recentUpdateItem: RecentUpdateItemType;
}

const RecentUpdateItem = ({ recentUpdateItem }: RecentUpdateItemProps) => {
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
          <div>{recentUpdateItem.creatorUsername.charAt(0).toUpperCase()}</div>
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
            <Typography.Text className="text-pink font-weight-half-bold">
              {recentUpdateItem.issueKey}
            </Typography.Text>
            <Typography.Text className="ml-2 font-weight-half-bold">
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
