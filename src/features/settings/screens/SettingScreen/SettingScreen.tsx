import { memo } from "react";

import { SettingOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./SettingScreen.module.scss";
import { SettingPaths } from "../../constants/settings.path";

const SettingScreen = () => {
  const navigate = useNavigate();
  const { projectId, subProjectId } = useParams();

  return (
    <div className={styles.container}>
      <Typography className="font-16 font-weight-bold">
        <SettingOutlined /> Project Settings
      </Typography>
      <div className="ml-8">
        <Typography
          onClick={() =>
            navigate(
              SettingPaths.MEMBERS(String(projectId), String(subProjectId))
            )
          }
          className="mt-5 settingItem"
        >
          Members
        </Typography>
        <Typography className="mt-2 settingItem">Issue Types</Typography>
      </div>
    </div>
  );
};

export default memo(SettingScreen);
