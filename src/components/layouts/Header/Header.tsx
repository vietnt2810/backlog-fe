import { memo } from "react";

import {
  CaretDownOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Dropdown, Typography } from "antd";
import { useParams } from "react-router-dom";

import { ReactComponent as NotificationIcon } from "@/assets/images/NotificationIcon.svg";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import useGetUser from "@/features/dashboard/hooks/useGetUser";
import useGetMemberDetail from "@/features/project/hooks/useGetMemberDetail";
import useGetProject from "@/features/project/hooks/useGetProject";

import styles from "./Header.module.scss";

const Header = () => {
  const { projectId } = useParams();

  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );
  const { memberDetail, isGetMemberDetailLoading } = useGetMemberDetail(
    String(projectId),
    String(localStorage.getItem(USER_ID))
  );
  const { project, isGetProjectLoading } = useGetProject(String(projectId));

  if (isGetUserLoading || isGetMemberDetailLoading || isGetProjectLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className="flex-align-center">
        <div className="headerItem">Dashboard</div>
        <div className="headerItem">Projects</div>
        <div className="headerItem">Recently viewed</div>
        <div className="headerItem">
          <PlusCircleOutlined />
        </div>
      </div>
      <div className="flex-align-center col-gap-20">
        <div className="notificationIcon mr-2">
          <NotificationIcon />
        </div>
        <Dropdown
          className="dropdown px-2 py-1"
          placement="bottomRight"
          trigger={["click"]}
          dropdownRender={() => (
            <Typography>{`Hello, ${memberDetail?.username}`}</Typography>
          )}
        >
          <div className="flex-align-center">
            {user?.avatarUrl && (
              <img alt="avatar" src={user?.avatarUrl} className="avatar" />
            )}
            <Typography className="ml-1 text-black font-weight-bold">
              {memberDetail?.username}
              <CaretDownOutlined className="ml-1" />
            </Typography>
          </div>
        </Dropdown>
        <div className="headerProjectItem">
          <ProjectOutlined className="mr-2" />
          {project?.projectName}
        </div>
        <div className="headerItem">
          <HomeOutlined />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
