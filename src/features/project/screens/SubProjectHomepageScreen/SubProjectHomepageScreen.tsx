import { memo } from "react";

import { Typography } from "antd";
import { useParams } from "react-router-dom";

import styles from "./SubProjectHomepageScreen.module.scss";
import RecentUpdateItem from "../../components/RecentUpdateItem/RecentUpdateItem";
import useGetSubProjectRecentUpdates from "../../hooks/useGetSubProjectRecentUpdates";

const SubProjectHomepageScreen = () => {
  const { subProjectId } = useParams();

  const { subProjectRecentUpdates } = useGetSubProjectRecentUpdates(
    String(subProjectId)
  );

  return (
    <div className={styles.container}>
      <div className="mb-3">
        <Typography.Text className="font-16 text-dark font-weight-bold">
          Project Home
        </Typography.Text>
        <Typography.Text className="font-15 text-dark font-weight-half-bold">
          {` : Recent Updates`}
        </Typography.Text>
      </div>
      <div className="recentUpdateContainer">
        {subProjectRecentUpdates?.map(recentUpdateItem => (
          <RecentUpdateItem recentUpdateItem={recentUpdateItem} />
        ))}
      </div>
    </div>
  );
};

export default memo(SubProjectHomepageScreen);
