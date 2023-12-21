/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unsafe-optional-chaining */
import { memo } from "react";

import { Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import { IssuePaths } from "@/features/issue/constants/issue.paths";

import styles from "./SubProjectHomepageScreen.module.scss";
import RecentUpdateItem from "../../components/RecentUpdateItem/RecentUpdateItem";
import useGetIssueStatusCount from "../../hooks/useGetIssueStatusCount";
import useGetSubProjectRecentUpdates from "../../hooks/useGetSubProjectRecentUpdates";

const SubProjectHomepageScreen = () => {
  const navigate = useNavigate();
  const { projectId, subProjectId } = useParams();

  const { subProjectRecentUpdates } = useGetSubProjectRecentUpdates(
    String(subProjectId)
  );
  const { issueStatusCount } = useGetIssueStatusCount(String(subProjectId));

  return (
    <div className={styles.container}>
      <div className="recentUpdateContainer">
        <div className="mb-3">
          <Typography.Text className="font-16 text-dark font-weight-bold">
            Project Home
          </Typography.Text>
          <Typography.Text className="font-15 text-dark font-weight-half-bold">
            {` : Recent Updates`}
          </Typography.Text>
        </div>
        {subProjectRecentUpdates?.map(recentUpdateItem => (
          <RecentUpdateItem recentUpdateItem={recentUpdateItem} />
        ))}
      </div>
      {!!issueStatusCount?.totalIssues && (
        <div className="statusContainer">
          <Typography className="font-16 text-dark font-weight-bold">
            Status
          </Typography>
          <div className="statusBox mt-3">
            <div className="d-flex statusBar">
              <div
                title="Open"
                className="bg-status-color-1"
                style={{
                  width: `${
                    (Number(issueStatusCount?.openIssuesCount) /
                      Number(issueStatusCount?.totalIssues)) *
                    100
                  }%`,
                }}
              />
              <div
                title="In Progress"
                className="bg-status-color-2"
                style={{
                  width: `${
                    (Number(issueStatusCount?.inProgressIssuesCount) /
                      Number(issueStatusCount?.totalIssues)) *
                    100
                  }%`,
                }}
              />
              <div
                title="Resolved"
                className="bg-status-color-3"
                style={{
                  width: `${
                    (Number(issueStatusCount?.resolvedIssuesCount) /
                      Number(issueStatusCount?.totalIssues)) *
                    100
                  }%`,
                }}
              />
              <div
                title="Pending"
                className="bg-status-color-4"
                style={{
                  width: `${
                    (Number(issueStatusCount?.pendingIssuesCount) /
                      Number(issueStatusCount?.totalIssues)) *
                    100
                  }%`,
                }}
              />
              <div
                title="Closed"
                className="bg-status-color-5"
                style={{
                  width: `${
                    (Number(issueStatusCount?.closedIssuesCount) /
                      Number(issueStatusCount?.totalIssues)) *
                    100
                  }%`,
                }}
              />
            </div>
            <Typography className="text-right mb-2">
              {`${Math.round(
                (Number(issueStatusCount?.closedIssuesCount) /
                  Number(issueStatusCount?.totalIssues)) *
                  100
              )}% Closed`}
            </Typography>
            <div className="flex-wrap d-flex statusCountBox">
              <div
                className="flex-center flex-direction-column cursor-pointer"
                title="Open"
              >
                <Typography className="mb-1 font-13">Open</Typography>
                <div
                  onClick={() =>
                    navigate(
                      IssuePaths.ISSUES(
                        String(projectId),
                        String(subProjectId)
                      ).concat("?status=1")
                    )
                  }
                  className="bg-status-color-1 statusCount flex-center font-14"
                >
                  {issueStatusCount?.openIssuesCount}
                </div>
              </div>
              <div
                className="flex-center flex-direction-column cursor-pointer"
                title="In Progress"
              >
                <Typography className="mb-1 font-13">In Progress</Typography>
                <div
                  onClick={() =>
                    navigate(
                      IssuePaths.ISSUES(
                        String(projectId),
                        String(subProjectId)
                      ).concat("?status=2")
                    )
                  }
                  className="bg-status-color-2 statusCount flex-center font-14"
                >
                  {issueStatusCount?.inProgressIssuesCount}
                </div>
              </div>
              <div
                className="flex-center flex-direction-column cursor-pointer"
                title="Resolved"
              >
                <Typography className="mb-1 font-13">Resolved</Typography>
                <div
                  onClick={() =>
                    navigate(
                      IssuePaths.ISSUES(
                        String(projectId),
                        String(subProjectId)
                      ).concat("?status=3")
                    )
                  }
                  className="bg-status-color-3 statusCount flex-center font-14"
                >
                  {issueStatusCount?.resolvedIssuesCount}
                </div>
              </div>
              <div
                className="flex-center flex-direction-column cursor-pointer"
                title="Pending"
              >
                <Typography className="mb-1 font-13">Pending</Typography>
                <div
                  onClick={() =>
                    navigate(
                      IssuePaths.ISSUES(
                        String(projectId),
                        String(subProjectId)
                      ).concat("?status=4")
                    )
                  }
                  className="bg-status-color-4 statusCount flex-center font-14"
                >
                  {issueStatusCount?.pendingIssuesCount}
                </div>
              </div>
              <div
                className="flex-center flex-direction-column cursor-pointer"
                title="Closed"
              >
                <Typography className="mb-1 font-13">Closed</Typography>
                <div
                  onClick={() =>
                    navigate(
                      IssuePaths.ISSUES(
                        String(projectId),
                        String(subProjectId)
                      ).concat("?status=5")
                    )
                  }
                  className="bg-status-color-5 statusCount flex-center font-14"
                >
                  {issueStatusCount?.closedIssuesCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SubProjectHomepageScreen);
