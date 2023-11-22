import { memo } from "react";

import { Dropdown, Typography } from "antd";
import cx from "classnames";
import { Link } from "react-router-dom";

import Logo from "@/components/atoms/Logo/Logo";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import { DashboardPathsEnum } from "@/features/dashboard/constants/dashboard.paths";
import useGetProjects from "@/features/dashboard/hooks/useGetProjects";
import useGetUser from "@/features/dashboard/hooks/useGetUser";

import styles from "./DashboardHeader.module.scss";

interface DashboardHeaderProps {
  subHeaderTitle: string;
}

const DashboardHeader = ({ subHeaderTitle }: DashboardHeaderProps) => {
  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );

  const { projects, isGetProjectsLoading } = useGetProjects(
    String(localStorage.getItem(USER_ID))
  );

  return (
    <div>
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

            <Typography className="ml-1 text-white">
              {user?.username}
            </Typography>
          </div>
        </Dropdown>
      </div>
      <div className={cx(styles.subHeader)}>
        <Typography className={cx(styles.subHeaderItem, "flex-center")}>
          {subHeaderTitle}
        </Typography>
      </div>
    </div>
  );
};

export default memo(DashboardHeader);
