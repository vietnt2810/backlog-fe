/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useState } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";
import { Dropdown, Typography } from "antd";
import cx from "classnames";
import { Link, useNavigate } from "react-router-dom";

import Logo from "@/components/atoms/Logo/Logo";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import { DashboardPathsEnum } from "@/features/dashboard/constants/dashboard.paths";
import useGetProjects from "@/features/dashboard/hooks/useGetProjects";
import useGetUser from "@/features/dashboard/hooks/useGetUser";
import { handleClearLocalStorage } from "@/utils/utils";

import styles from "./DashboardHeader.module.scss";
import CreateProjectModal from "../CreateEditProjectModal/CreateEditProjectModal";

interface DashboardHeaderProps {
  subHeaderTitle: string;
}

const DashboardHeader = ({ subHeaderTitle }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );

  const { projects, isGetProjectsLoading, refetchProjects } = useGetProjects(
    String(localStorage.getItem(USER_ID))
  );

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  return (
    <>
      <div className="bg-dashboard-header px-5 py-2 flex-space-between-center">
        <Logo textWhite />
        <Dropdown
          className="cursor-pointer"
          placement="bottomRight"
          trigger={["click"]}
          dropdownRender={() => (
            <div className="profile-dropdown-container">
              {isGetProjectsLoading || isGetUserLoading ? (
                <Loader />
              ) : (
                <>
                  <Link to={DashboardPathsEnum.USER_PROFILE}>
                    <div className="flex-align-center profile-dropdown-item">
                      {user?.avatarUrl && (
                        <img
                          className={cx(styles.avatar, "mr-2")}
                          alt="avatar"
                          src={user?.avatarUrl}
                        />
                      )}
                      <div>
                        <Typography>{user?.username}</Typography>
                        <Typography className="text-dark-20">
                          My profile
                        </Typography>
                      </div>
                    </div>
                  </Link>
                  {projects?.map(project => (
                    <div className="profile-dropdown-item">
                      {project.projectName}
                    </div>
                  ))}
                  <div
                    onClick={() => setIsCreateProjectModalOpen(true)}
                    className="profile-dropdown-item"
                  >
                    <PlusCircleOutlined />
                    <Typography.Text className="ml-2 text-dark-20">
                      Create a new project
                    </Typography.Text>
                  </div>
                  <div
                    onClick={() => {
                      handleClearLocalStorage();
                      navigate(AuthPathsEnum.LOGIN);
                    }}
                    className="profile-dropdown-item"
                  >
                    <Typography.Text className="text-dark-20">
                      Logout
                    </Typography.Text>
                  </div>
                </>
              )}
            </div>
          )}
        >
          <div className="flex-align-center">
            {user?.avatarUrl && (
              <img
                alt="avatar"
                src={user?.avatarUrl}
                className={cx(styles.avatar)}
              />
            )}
            <Typography className="ml-1">{user?.username}</Typography>
          </div>
        </Dropdown>
      </div>
      <div className={cx(styles.subHeader)}>
        <Typography className={cx(styles.subHeaderItem, "flex-center")}>
          {subHeaderTitle}
        </Typography>
      </div>
      {isCreateProjectModalOpen && (
        <CreateProjectModal
          refetchProjects={refetchProjects}
          open={isCreateProjectModalOpen}
          onCancel={() => setIsCreateProjectModalOpen(false)}
        />
      )}
    </>
  );
};

export default memo(DashboardHeader);
