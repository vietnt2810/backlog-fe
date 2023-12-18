/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useState } from "react";

import {
  CaretDownOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Dropdown, Modal, Select, Typography } from "antd";
import cx from "classnames";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as NotificationIcon } from "@/assets/images/NotificationIcon.svg";
import Form, { Item } from "@/components/atoms/Form/Form";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import { DashboardPathsEnum } from "@/features/dashboard/constants/dashboard.paths";
import useGetUser from "@/features/dashboard/hooks/useGetUser";
import CreateIssueScreen from "@/features/issue/screens/CreateIssueScreen/CreateIssueScreen";
import ChangeUserInformationInProjectModal from "@/features/project/components/ChangeUserInformationInProjectModal/ChangeUserInformationInProjectModal";
import { ProjectPaths } from "@/features/project/constants/project.paths";
import useGetProject from "@/features/project/hooks/useGetProject";
import useGetSubProjects from "@/features/project/hooks/useGetSubProjects";
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

  const [
    isChangeUserInformationInProjectModalOpen,
    setIsChangeUserInformationInProjectModalOpen,
  ] = useState(false);

  const [isIssueCreateModalOpen, setIsIssueCreateModalOpen] = useState(false);
  const [chosenSubProjectToCreateIssue, setChosenSubProjectToCreateIssue] =
    useState<SubProject>();

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
          <div className="headerItem">Projects</div>
          <div className="headerItem">Recently viewed</div>
          <div
            className="headerItem"
            onClick={() => setIsIssueCreateModalOpen(true)}
          >
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
