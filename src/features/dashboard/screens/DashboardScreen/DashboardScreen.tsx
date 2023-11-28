import { memo, useState } from "react";

import { Modal, Typography } from "antd";
import cx from "classnames";
import { Link } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Loader from "@/components/organisms/Loader/Loader";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader/DashboardHeader";
import { ProjectPathsEnum } from "@/features/project/constants/project.paths";
import { getCurrentDate } from "@/utils/utils";

import styles from "./DashboardScreen.module.scss";
import CreateEditProjectModal from "../../components/CreateEditProjectModal/CreateEditProjectModal";
import useDeleteProject from "../../hooks/useDeleteProject";
import useGetProjects from "../../hooks/useGetProjects";
import useGetUser from "../../hooks/useGetUser";
import { CreateEditProjectRequestBody } from "../../types/dashboard.types";

const DashboardScreen = () => {
  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );
  const { projects, isGetProjectsLoading, refetchProjects } = useGetProjects(
    String(localStorage.getItem(USER_ID))
  );
  const { deleteProject, isDeleteProjectLoading } = useDeleteProject();

  const [selectedProjectToDelete, setSelectedProjectToDelete] = useState<
    number | null
  >(null);
  const [selectedProjectToUpdate, setSelectedProjectToUpdate] =
    useState<CreateEditProjectRequestBody | null>(null);

  const handleDeleteProject = () => {
    deleteProject(String(selectedProjectToDelete))
      .then(() => {
        openNotification({
          type: "success",
          message: "You have successfully deleted a project",
        });
        refetchProjects();
      })
      .finally(() => setSelectedProjectToDelete(null));
  };

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
                  <div>
                    <Button
                      onClick={() => setSelectedProjectToDelete(project.id)}
                      className="deleteProjectButton mr-2 font-weight-bold"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() =>
                        setSelectedProjectToUpdate({
                          projectName: project.projectName,
                          projectId: project.id,
                        })
                      }
                      className="editProjectButton mr-2 font-weight-bold"
                    >
                      Edit
                    </Button>
                    <Button className="openProjectButton font-weight-bold">
                      <Link
                        to={ProjectPathsEnum.PROJECT_HOMEPAGE.replace(
                          ":projectId",
                          String(project.id)
                        )}
                        target="_blank"
                      >
                        Open
                      </Link>
                    </Button>
                  </div>
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
      {!!selectedProjectToDelete && (
        <Modal
          open={!!selectedProjectToDelete}
          onOk={handleDeleteProject}
          onCancel={() => setSelectedProjectToDelete(null)}
          title={
            <Typography className="text-black font-20">
              Delete a project
            </Typography>
          }
          okText="Delete"
          okButtonProps={{ disabled: isDeleteProjectLoading }}
          closable={false}
        >
          <Typography className="text-black">
            Are you sure to delete this project?
          </Typography>
        </Modal>
      )}
      {!!selectedProjectToUpdate && (
        <CreateEditProjectModal
          project={selectedProjectToUpdate}
          onCancel={() => setSelectedProjectToUpdate(null)}
          refetchProjects={refetchProjects}
          open={!!selectedProjectToUpdate}
        />
      )}
    </div>
  );
};

export default memo(DashboardScreen);
