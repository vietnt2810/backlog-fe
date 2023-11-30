/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useState } from "react";

import { ContainerOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useParams } from "react-router-dom";

import Header from "@/components/layouts/Header/Header";

import styles from "./ProjectHomepageScreen.module.scss";
import CreateSubProjectModal from "../../components/CreateSubProjectModal/CreateSubProjectModal";
import useGetProject from "../../hooks/useGetProject";
import useGetSubProjects from "../../hooks/useGetSubProjects";
import { USER_ID } from "@/constants/constants";

const ProjectHomepageScreen = () => {
  const { projectId } = useParams();

  const { project } = useGetProject(
    String(localStorage.getItem(USER_ID)),
    String(projectId)
  );
  const { subProjects, refetchSubProjects } = useGetSubProjects(
    String(projectId)
  );

  const [isCreateSubProjectModalOpen, setIsCreateSubProjectModalOpen] =
    useState(false);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className="py-4 pb-10">
          <Typography className="font-20 text-black font-weight-bold text-center mb-4">
            {project?.project.projectName.toUpperCase()}
          </Typography>
          <div className="mainContent">
            <div className="leftContent">
              <div className="subProjects">
                <Typography className="font-16 font-weight-bold mb-2">
                  Sub Projects
                </Typography>
                {subProjects?.map(subProject => (
                  <div className="subProjectItem" key={subProject.id}>
                    <ContainerOutlined className="subProjectIcon" />
                    <div className="ml-4">
                      <Typography className="font-weight-bold">
                        {subProject.subProjectName}
                      </Typography>
                      <Typography className="font-11 text-dark-30 subTitle">
                        {subProject.subTitle}
                      </Typography>
                      <div className="subProjectButtonContainer">
                        <Typography.Text>Add Issue</Typography.Text>
                        <Typography.Text className="ml-2">|</Typography.Text>
                        <Typography.Text className="ml-2">
                          Issues
                        </Typography.Text>
                        <Typography.Text className="ml-2">|</Typography.Text>
                        <Typography.Text className="ml-2">
                          Board
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                ))}
                {project?.role && (
                  <div
                    className="subProjectItem"
                    onClick={() => setIsCreateSubProjectModalOpen(true)}
                  >
                    <PlusOutlined className="createSubProjectIcon" />
                    <Typography className="ml-4 font-weight-bold">
                      Create a Sub Project
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            <div className="recentUpdates" />
          </div>
        </div>
      </div>
      {isCreateSubProjectModalOpen && (
        <CreateSubProjectModal
          open={isCreateSubProjectModalOpen}
          refetchSubProjects={refetchSubProjects}
          onCancel={() => setIsCreateSubProjectModalOpen(false)}
        />
      )}
    </>
  );
};

export default memo(ProjectHomepageScreen);
