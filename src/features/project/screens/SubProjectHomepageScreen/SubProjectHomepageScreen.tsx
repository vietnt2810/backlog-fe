import { memo } from "react";

import { Typography } from "antd";

import styles from "./SubProjectHomepageScreen.module.scss";

const SubProjectHomepageScreen = () => {
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
      <div className="timelineContainer">
        <div className="timelineItem">
          <div className="timelineDate">Wed Dec. 13, 2023</div>
          <div className="timelineContent">123</div>
        </div>
      </div>
    </div>
  );
};

export default memo(SubProjectHomepageScreen);
