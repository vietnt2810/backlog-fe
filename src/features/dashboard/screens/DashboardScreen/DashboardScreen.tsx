import { memo } from "react";

import { Dropdown, Typography } from "antd";
import cx from "classnames";

import Button from "@/components/atoms/Button/Button";
import Logo from "@/components/atoms/Logo/Logo";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import { getCurrentDate } from "@/utils/utils";

import styles from "./DashboardScreen.module.scss";
import useGetProjects from "../../hooks/useGetProjects";
import useGetUser from "../../hooks/useGetUser";

const DashboardScreen = () => {
  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );

  const { projects, isGetProjectsLoading } = useGetProjects(
    String(localStorage.getItem(USER_ID))
  );

  return (
    <div className={cx(styles.container)}>
      <div className="bg-dashboard-header px-5 py-2 flex-space-between-center">
        <Logo textWhite />
        <Dropdown
          className="cursor-pointer"
          placement="bottomRight"
          trigger={["click"]}
          dropdownRender={() => (
            <div className="profile-dropdown-container">
              <div className="d-flex profile-dropdown-item">
                <div className="avatar mr-2">F</div>
                <div>
                  <Typography>{user?.username}</Typography>
                  <Typography className="text-dark-20">My profile</Typography>
                </div>
              </div>
              {projects?.map(project => (
                <div className="profile-dropdown-item">
                  {project.projectName}
                </div>
              ))}
            </div>
          )}
        >
          <div className="flex-align-center">
            <div className="avatar">F</div>
            <Typography className="ml-1 text-white">
              {user?.username}
            </Typography>
          </div>
        </Dropdown>
      </div>
      <div className="subHeader">
        <Typography className="subHeaderItem flex-center">DASHBOARD</Typography>
      </div>
      {isGetProjectsLoading || isGetUserLoading ? (
        <Loader />
      ) : (
        <div className="mainContent">
          <Typography className="font-16">
            {`Welcome back ${user?.username}! It's ${getCurrentDate()}.`}
          </Typography>
          <Typography className="font-16 font-weight-bold my-4">
            Your projects
          </Typography>
          <div>
            {projects?.map(project => (
              <div
                key={project.id}
                className="projectItem flex-space-between-center my-4"
              >
                <div className="flex-align-center">
                  <div className="projectLogo flex-center">
                    {project.projectName.charAt(0)}
                  </div>
                  <Typography className="font-weight-bold pl-2">
                    {project.projectName}
                  </Typography>
                </div>
                <Button className="openProjectButton">Open</Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DashboardScreen);
