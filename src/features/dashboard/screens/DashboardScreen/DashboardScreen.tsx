import { memo } from "react";

import { Typography } from "antd";
import cx from "classnames";

import Button from "@/components/atoms/Button/Button";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader/DashboardHeader";
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
      <DashboardHeader subHeaderTitle="DASHBOARD" />
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
            {projects?.length ? (
              projects?.map(project => (
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
              ))
            ) : (
              <Typography>
                Currently, you have not joined in any projects
              </Typography>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DashboardScreen);
