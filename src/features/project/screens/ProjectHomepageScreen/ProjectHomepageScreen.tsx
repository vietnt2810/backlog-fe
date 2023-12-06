/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEvent, memo, useEffect, useState } from "react";

import {
  ContainerOutlined,
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, Typography } from "antd";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";

import Form, { Item } from "@/components/atoms/Form/Form";
import Header from "@/components/layouts/Header/Header";
import { USER_ID } from "@/constants/constants";

import styles from "./ProjectHomepageScreen.module.scss";
import CreateSubProjectModal from "../../components/CreateSubProjectModal/CreateSubProjectModal";
import useGetProject from "../../hooks/useGetProject";
import useGetSubProjects from "../../hooks/useGetSubProjects";
import { SubProjectsResponse } from "../../types/project.types";

const ProjectHomepageScreen = () => {
  const { projectId } = useParams();

  const { project } = useGetProject(
    String(localStorage.getItem(USER_ID)),
    String(projectId)
  );
  const { subProjects, refetchSubProjects } = useGetSubProjects(
    String(projectId)
  );

  const [isSubProjectsVisible, setIsSubProjectsVisible] = useState(false);
  const [filteredSubProjects, setFilteredSubProjects] =
    useState<SubProjectsResponse>();
  const [isSubProjectSearchBoxOpen, setIsSubProjectSearchBoxOpen] =
    useState(false);

  const [isCreateSubProjectModalOpen, setIsCreateSubProjectModalOpen] =
    useState(false);

  const handleFilterSubProject = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredSubProjects(
      subProjects?.filter(subProject =>
        subProject.subProjectName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredSubProjects(subProjects);
  }, [subProjects]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className="py-4 pb-10">
          <Typography className="font-20 font-weight-bold text-center mb-4">
            {project?.project.projectName.toUpperCase()}
          </Typography>
          <div className="mainContent">
            <div className="leftContent">
              <div>
                <Dropdown
                  className=""
                  open={isSubProjectsVisible}
                  trigger={["click"]}
                  dropdownRender={() => (
                    <div className="subProjectContainer">
                      {filteredSubProjects?.map(subProject => (
                        <div className="subProjectItem" key={subProject.id}>
                          <ContainerOutlined className="subProjectIcon" />
                          <div className="ml-4">
                            <Typography className="font-weight-bold subProjectName">
                              {subProject.subProjectName}
                            </Typography>
                            <Typography className="font-11 text-dark-30 subTitle">
                              {subProject.subTitle}
                            </Typography>
                            <div className="subProjectButtonContainer">
                              <Typography.Text>Add Issue</Typography.Text>
                              <Typography.Text className="ml-2">
                                |
                              </Typography.Text>
                              <Typography.Text className="ml-2">
                                Issues
                              </Typography.Text>
                              <Typography.Text className="ml-2">
                                |
                              </Typography.Text>
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
                          onClick={() => {
                            setIsCreateSubProjectModalOpen(true);
                          }}
                        >
                          <PlusOutlined className="createSubProjectIcon" />
                          <Typography className="ml-4 font-weight-bold createSubProjectButton">
                            Create a Sub Project
                          </Typography>
                        </div>
                      )}
                    </div>
                  )}
                >
                  <div className="subProjectsContentTitle">
                    <div
                      className="flex-align-center cursor-pointer"
                      onClick={() => {
                        setIsSubProjectsVisible(!isSubProjectsVisible);
                        setFilteredSubProjects(subProjects);
                      }}
                    >
                      {isSubProjectsVisible ? (
                        <UpOutlined className="mr-1" />
                      ) : (
                        <DownOutlined className="mr-1" />
                      )}
                      <Typography className="font-16 font-weight-bold">
                        Sub Projects
                      </Typography>
                    </div>
                    {isSubProjectsVisible && (
                      <div className="flex-align-center">
                        <SearchOutlined
                          onClick={() => setIsSubProjectSearchBoxOpen(true)}
                          className="searchIcon cursor-pointer"
                        />
                        {isSubProjectSearchBoxOpen && (
                          <Form>
                            <Item className="mb-0 ml-2">
                              <Input
                                onChange={e => handleFilterSubProject(e)}
                                onBlur={e =>
                                  isEmpty(e.target.value) &&
                                  setIsSubProjectSearchBoxOpen(false)
                                }
                                className="searchInput"
                                placeholder="Search sub projects"
                                allowClear
                                autoFocus
                              />
                            </Item>
                          </Form>
                        )}
                      </div>
                    )}
                  </div>
                </Dropdown>
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
