/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useState } from "react";

import {
  CaretDownOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Modal, Select, Typography } from "antd";
import cx from "classnames";
import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as NotificationIcon } from "@/assets/images/NotificationIcon.svg";
import Form, { Item } from "@/components/atoms/Form/Form";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import { DashboardPathsEnum } from "@/features/dashboard/constants/dashboard.paths";
import useGetUser from "@/features/dashboard/hooks/useGetUser";
import { IssuePaths } from "@/features/issue/constants/issue.paths";
import CreateIssueScreen from "@/features/issue/screens/CreateEditIssueScreen/CreateEditIssueScreen";
import ChangeUserInformationInProjectModal from "@/features/project/components/ChangeUserInformationInProjectModal/ChangeUserInformationInProjectModal";
import { notificationTexts } from "@/features/project/constants/project.constants";
import { ProjectPaths } from "@/features/project/constants/project.paths";
import useGetNotifications from "@/features/project/hooks/useGetNotifications";
import useGetProject from "@/features/project/hooks/useGetProject";
import useGetSubProjects from "@/features/project/hooks/useGetSubProjects";
import useUpdateReadNotification from "@/features/project/hooks/useUpdateReadNotification";
import { SubProject } from "@/features/project/types/project.types";
import { handleClearLocalStorage } from "@/utils/utils";

import styles from "./Header.module.scss";

interface HeaderProps {
  fromSubProject?: boolean;
}

const Header = ({ fromSubProject = false }: HeaderProps) => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );
  const { project, isGetProjectLoading, refetchProject } = useGetProject(
    String(localStorage.getItem(USER_ID)),
    String(projectId)
  );
  const { subProjects } = useGetSubProjects(String(projectId));
  const { notifications, refetchNotifications } = useGetNotifications(
    String(projectId),
    String(localStorage.getItem(USER_ID))
  );
  const { readNotification } = useUpdateReadNotification();

  const [
    isChangeUserInformationInProjectModalOpen,
    setIsChangeUserInformationInProjectModalOpen,
  ] = useState(false);

  const [isIssueCreateModalOpen, setIsIssueCreateModalOpen] = useState(false);
  const [chosenSubProjectToCreateIssue, setChosenSubProjectToCreateIssue] =
    useState<SubProject>();

  const tableStatusTexts: Record<number, React.ReactNode> = {
    1: <div className="bg-status-color-1 status">Open</div>,
    2: <div className="bg-status-color-2 status">In progress</div>,
    3: <div className="bg-status-color-3 status">Resolved</div>,
    4: <div className="bg-status-color-4 status">Pending</div>,
    5: <div className="bg-status-color-5 status">Closed</div>,
  };

  if (isGetUserLoading || isGetProjectLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={cx(
          styles.container,
          fromSubProject ? "bg-header-from-sub-project" : ""
        )}
      >
        <div className="flex-align-center">
          <div
            className="headerItem"
            onClick={() =>
              navigate(ProjectPaths.PROJECT_HOMEPAGE(String(projectId)))
            }
          >
            Dashboard
          </div>
          <div className="headerItem">Recently viewed</div>
          <div
            className="headerItem"
            onClick={() => setIsIssueCreateModalOpen(true)}
          >
            <PlusCircleOutlined />
          </div>
        </div>
        <div className="flex-align-center col-gap-20">
          <Dropdown
            className="dropdown"
            placement="bottomLeft"
            trigger={["click"]}
            dropdownRender={() => (
              <div className="notification-dropdown-container">
                <div className="notification-header">Notification</div>
                {notifications?.map(notification => (
                  <Link
                    onClick={() => {
                      readNotification(String(notification.id));
                      setTimeout(() => {
                        refetchNotifications();
                      }, 300);
                    }}
                    target="_blank"
                    to={IssuePaths.ISSUE_DETAIL(
                      String(projectId),
                      String(notification.subProjectId),
                      String(notification.issueId)
                    ).concat(`#comment-${notification.issueUpdateId}`)}
                  >
                    <div
                      className={"notification-item flex-space-between".concat(
                        notification.isRead ? "" : " unread-notification-item"
                      )}
                    >
                      <div className="d-flex">
                        {notification?.creatorAvatarUrl ? (
                          <img
                            alt="avatar"
                            src={notification.creatorAvatarUrl}
                            className="creatorAvatar"
                          />
                        ) : (
                          <div className="creatorAvatar flex-center">
                            {notification?.creatorUsername
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                        <div className="ml-2">
                          <div>
                            <Typography.Text className="font-weight-half-bold">
                              {notification.creatorUsername}
                            </Typography.Text>
                            <Typography.Text className="ml-1">
                              {notificationTexts[notification.updateType]}
                            </Typography.Text>
                          </div>
                          <div>
                            <Typography.Text className="font-weight-half-bold">
                              {notification.issueKey}
                            </Typography.Text>
                            <Typography.Text className="ml-1">
                              {notification.subject}
                            </Typography.Text>
                          </div>
                        </div>
                      </div>
                      <div className="notificationDate">
                        <Typography className="text-dark-30">
                          {dayjs(notification.createdAt).format(
                            "MMM DD YYYY HH:mm"
                          )}
                        </Typography>
                        {tableStatusTexts[notification.status]}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          >
            <Badge
              dot={
                !!notifications?.find(
                  notificationItem => !notificationItem.isRead
                )
              }
            >
              <NotificationIcon className="notificationIcon" />
            </Badge>
          </Dropdown>
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
                  <Typography>Activity</Typography>
                </div>
                <div
                  className="header-dropdown-item"
                  onClick={() =>
                    setIsChangeUserInformationInProjectModalOpen(true)
                  }
                >
                  <Typography>
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
                  <Typography>Logout</Typography>
                </div>
              </div>
            )}
          >
            <div className="flex-align-center">
              {user?.avatarUrl && (
                <img alt="avatar" src={user?.avatarUrl} className="avatar" />
              )}
              <Typography className="ml-1 font-weight-bold">
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
      {isIssueCreateModalOpen && (
        <Modal
          closable={false}
          footer={false}
          open={isIssueCreateModalOpen}
          onCancel={() => setIsIssueCreateModalOpen(false)}
        >
          <Form layout="vertical">
            <Item
              label={
                <Typography className="font-weight-bold">
                  Select a Sub project
                </Typography>
              }
            >
              <Select
                onChange={subProjectId => {
                  setChosenSubProjectToCreateIssue(
                    subProjects?.filter(
                      subProject => subProject.id === subProjectId
                    )[0]
                  );
                  setIsIssueCreateModalOpen(false);
                }}
                options={subProjects?.map(subProject => {
                  return {
                    label: subProject.subProjectName,
                    value: subProject.id,
                  };
                })}
                placeholder="Select a sub project"
              />
            </Item>
          </Form>
        </Modal>
      )}
      {!!chosenSubProjectToCreateIssue && (
        <Modal
          className="createIssueModal"
          footer={false}
          width="85%"
          onCancel={() => setChosenSubProjectToCreateIssue(undefined)}
          open
        >
          <CreateIssueScreen
            closeModal={() => setChosenSubProjectToCreateIssue(undefined)}
            subProject={chosenSubProjectToCreateIssue}
          />
        </Modal>
      )}
    </>
  );
};

export default memo(Header);
