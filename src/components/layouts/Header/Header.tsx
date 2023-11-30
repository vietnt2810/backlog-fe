/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useState } from "react";

import {
  CaretDownOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Dropdown, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as NotificationIcon } from "@/assets/images/NotificationIcon.svg";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import { DashboardPathsEnum } from "@/features/dashboard/constants/dashboard.paths";
import useGetUser from "@/features/dashboard/hooks/useGetUser";
import ChangeUserInformationInProjectModal from "@/features/project/components/ChangeUserInformationInProjectModal/ChangeUserInformationInProjectModal";
import { ProjectPaths } from "@/features/project/constants/project.paths";
import useGetProject from "@/features/project/hooks/useGetProject";
import { handleClearLocalStorage } from "@/utils/utils";

import styles from "./Header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );
  const { project, isGetProjectLoading, refetchProject } = useGetProject(
    String(localStorage.getItem(USER_ID)),
    String(projectId)
  );

  const [
    isChangeUserInformationInProjectModalOpen,
    setIsChangeUserInformationInProjectModalOpen,
  ] = useState(false);

  if (isGetUserLoading || isGetProjectLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.container}>
        <div className="flex-align-center">
          <div
            className="headerItem"
            onClick={() =>
              navigate(ProjectPaths.PROJECT_HOMEPAGE(String(projectId)))
            }
          >
            Dashboard
          </div>
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
            placement="bottomLeft"
            trigger={["click"]}
            dropdownRender={() => (
              <div className="header-dropdown-container">
                <div className="header-dropdown-item">
                  <Typography className="text-dark-30">{`Hello, ${project?.username}`}</Typography>
                </div>
                <div className="header-dropdown-item">
                  <Typography className="text-black">Activity</Typography>
                </div>
                <div
                  className="header-dropdown-item"
                  onClick={() =>
                    setIsChangeUserInformationInProjectModalOpen(true)
                  }
                >
                  <Typography className="text-black">
                    Change your user information under this project
                  </Typography>
                </div>
                <div
                  className="header-dropdown-item"
                  onClick={() => {
                    handleClearLocalStorage();
                    navigate(AuthPathsEnum.LOGIN);
                  }}
                >
                  <Typography className="text-black">Logout</Typography>
                </div>
              </div>
            )}
          >
            <div className="flex-align-center">
              {user?.avatarUrl && (
                <img alt="avatar" src={user?.avatarUrl} className="avatar" />
              )}
              <Typography className="ml-1 text-black font-weight-bold">
                {project?.username}
                <CaretDownOutlined className="ml-1" />
              </Typography>
            </div>
          </Dropdown>
          <div className="headerProjectItem">
            <ProjectOutlined className="mr-2" />
            {project?.project.projectName}
          </div>
          <div className="headerItem">
            <Link to={DashboardPathsEnum.DASHBOARD} target="_blank">
              <HomeOutlined className="text-black" />
            </Link>
          </div>
        </div>
      </div>
      {isChangeUserInformationInProjectModalOpen && (
        <ChangeUserInformationInProjectModal
          refetchMemberDetail={refetchProject}
          open={isChangeUserInformationInProjectModalOpen}
          usernameInProject={project?.username}
          onCancel={() => setIsChangeUserInformationInProjectModalOpen(false)}
        />
      )}
    </>
  );
};

export default memo(Header);
