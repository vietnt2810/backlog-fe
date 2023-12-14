/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";

import {
  ContainerOutlined,
  DownOutlined,
  PlusOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Input, Table, Typography } from "antd";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";

import { ReactComponent as HighPriorityIcon } from "@/assets/images/highPriorityArrow.svg";
import { ReactComponent as LowPriorityIcon } from "@/assets/images/lowPriorityArrow.svg";
import { ReactComponent as NormalPriorityIcon } from "@/assets/images/normalPriorityArrow.svg";
import Form, { Item } from "@/components/atoms/Form/Form";
import Header from "@/components/layouts/Header/Header";
import { USER_ID } from "@/constants/constants";

import styles from "./ProjectHomepageScreen.module.scss";
import CreateSubProjectModal from "../../components/CreateSubProjectModal/CreateSubProjectModal";
import { USER_ISSUES_TABLE_COLUMNS } from "../../constants/project.constants";
import useGetProject from "../../hooks/useGetProject";
import useGetSubProjects from "../../hooks/useGetSubProjects";
import useGetUserIssues from "../../hooks/useGetUserIssues";
import {
  SubProjectsResponse,
  UserIssuesResponse,
} from "../../types/project.types";

const ProjectHomepageScreen = () => {
  const { projectId } = useParams();

  const [isAssigned, setIsAssigned] = useState(1);

  const { project } = useGetProject(
    String(localStorage.getItem(USER_ID)),
    String(projectId)
  );
  const { subProjects, refetchSubProjects } = useGetSubProjects(
    String(projectId)
  );
  const { userIssues, isGetUserIssuesLoading, refetchUserIssues } =
    useGetUserIssues(String(projectId), String(localStorage.getItem(USER_ID)), {
      isAssigned,
    });

  const [isSubProjectsVisible, setIsSubProjectsVisible] = useState(false);
  const [filteredSubProjects, setFilteredSubProjects] =
    useState<SubProjectsResponse>();
  const [isSubProjectSearchBoxOpen, setIsSubProjectSearchBoxOpen] =
    useState(false);

  const [isIssuesVisible, setIsIssuesVisible] = useState(false);
  const [filteredIssues, setFilteredIssues] = useState<UserIssuesResponse>();
  const [isIssuesSearchBoxOpen, setIsIssuesSearchBoxOpen] = useState(false);
  const [isCreateSubProjectModalOpen, setIsCreateSubProjectModalOpen] =
    useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statusTexts: Record<number, React.ReactNode> = {
    1: <div className="bg-status-color-1 status">Open</div>,
    2: <div className="bg-status-color-2 status">In progress</div>,
    3: <div className="bg-status-color-3 status">Resolved</div>,
    4: <div className="bg-status-color-4 status">Pending</div>,
    5: <div className="bg-status-color-5 status">Closed</div>,
  };

  const userIssuesTableData = useMemo(() => {
    return filteredIssues?.map(issue => ({
      ...issue,
      issueKey: (
        <Typography
          // TODO: onclick
          className="issueKey"
        >
          {issue.issueKey}
        </Typography>
      ),
      priority:
        // eslint-disable-next-line no-nested-ternary
        issue.priority === 1 ? (
          <HighPriorityIcon className="priorityIcon" />
        ) : issue.priority === 2 ? (
          <NormalPriorityIcon className="priorityIcon" />
        ) : (
          <LowPriorityIcon className="priorityIcon" />
        ),
      status: statusTexts[issue.status],
    }));
  }, [filteredIssues, statusTexts]);

  const handleFilterSubProject = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredSubProjects(
      subProjects?.filter(subProject =>
        subProject.subProjectName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleFilterIssue = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredIssues(
      userIssues?.filter(
        issue =>
          issue.issueKey.toLowerCase().includes(e.target.value.toLowerCase()) ||
          issue.subject.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredSubProjects(subProjects);
    setFilteredIssues(userIssues);
  }, [subProjects, userIssues]);

  useEffect(() => {
    refetchUserIssues();
  }, [isAssigned, refetchUserIssues]);

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
                <div className="dropdownContentTitle">
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
                <div className={isSubProjectsVisible ? "" : "d-none"}>
                  {filteredSubProjects?.map(subProject => (
                    <div className="dropdownItem" key={subProject.id}>
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
                      className="dropdownItem"
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
              </div>
              <div className="mt-4">
                <div className="dropdownContentTitle">
                  <div
                    className="flex-align-center cursor-pointer"
                    onClick={() => {
                      setIsIssuesVisible(!isIssuesVisible);
                      setFilteredIssues(userIssues);
                    }}
                  >
                    {isIssuesVisible ? (
                      <UpOutlined className="mr-1" />
                    ) : (
                      <DownOutlined className="mr-1" />
                    )}
                    <Typography className="font-16 font-weight-bold">
                      Issues
                    </Typography>
                  </div>
                  {isIssuesVisible && (
                    <div className="flex-align-center">
                      <SearchOutlined
                        onClick={() => setIsIssuesSearchBoxOpen(true)}
                        className="searchIcon cursor-pointer"
                      />
                      {isIssuesSearchBoxOpen && (
                        <Form>
                          <Item className="mb-0 ml-2">
                            <Input
                              onChange={e => handleFilterIssue(e)}
                              onBlur={e =>
                                isEmpty(e.target.value) &&
                                setIsIssuesSearchBoxOpen(false)
                              }
                              className="searchInput"
                              placeholder="Search issues"
                              allowClear
                              autoFocus
                            />
                          </Item>
                        </Form>
                      )}
                    </div>
                  )}
                </div>
                <div className={isIssuesVisible ? "" : "d-none"}>
                  <div className="issueFilter">
                    <Typography className="font-weight-half-bold">
                      Filters:
                    </Typography>
                    <div
                      className={
                        isAssigned
                          ? "filterOption activeFilterOption"
                          : "filterOption"
                      }
                      onClick={() => setIsAssigned(1)}
                    >
                      Assigned to me
                    </div>
                    <div
                      className={
                        !isAssigned
                          ? "filterOption activeFilterOption"
                          : "filterOption"
                      }
                      onClick={() => setIsAssigned(0)}
                    >
                      Created by me
                    </div>
                    <div />
                  </div>
                  <Table
                    loading={isGetUserIssuesLoading}
                    className="issuesTable"
                    dataSource={userIssuesTableData}
                    columns={USER_ISSUES_TABLE_COLUMNS}
                    pagination={false}
                    rowKey="id"
                  />
                </div>
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
