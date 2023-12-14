/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import {
  HomeFilled,
  PlusOutlined,
  ProfileOutlined,
  ProjectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Tooltip, Typography } from "antd";
import cx from "classnames";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { MAX_VISIBLE_MEMBERS } from "@/constants/constants";
import ProjectMembersModal from "@/features/project/components/ProjectMembersModal/ProjectMembersModal";
import { ProjectPaths } from "@/features/project/constants/project.paths";
import useGetProjectMembers from "@/features/project/hooks/useGetProjectMembers";
import useGetSubProjectDetail from "@/features/project/hooks/useGetSubProjectDetail";
import { SidebarInfo } from "@/types/sidebar.types";

import styles from "./DefaultLayout.module.scss";
import Header from "../Header/Header";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { projectId, subProjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { subProjectDetail } = useGetSubProjectDetail(
    String(projectId),
    String(subProjectId)
  );
  const { projectMembers } = useGetProjectMembers(String(projectId));

  const visibleMembers = useMemo(() => {
    return projectMembers?.slice(0, MAX_VISIBLE_MEMBERS);
  }, [projectMembers]);
  const additionalMembers = useMemo(() => {
    return Number(projectMembers?.length) - MAX_VISIBLE_MEMBERS;
  }, [projectMembers?.length]);

  const [selectedKey, setSelectedKey] = useState<string>("");
  const [isProjectMembersModalOpen, setIsProjectMembersModalOpen] =
    useState(false);

  const MENU_SIDEBAR = useCallback(() => {
    return [
      {
        key: "1",
        label: (
          <div>
            <HomeFilled />
            <span>Home</span>
          </div>
        ),
        path: ProjectPaths.SUB_PROJECT_HOMEPAGE(
          String(projectId),
          String(subProjectId)
        ),
      },
      {
        key: "2",
        label: (
          <div>
            <PlusOutlined />
            <span>Add Issue</span>
          </div>
        ),
        path: "TODO",
      },
      {
        key: "3",
        label: (
          <div>
            <ProfileOutlined />
            <span>Issues</span>
          </div>
        ),
        path: "TODO",
      },
      {
        key: "4",
        label: (
          <div>
            <ProjectOutlined />
            <span>Board</span>
          </div>
        ),
        path: "TODO",
      },
      {
        key: "5",
        label: (
          <div>
            <SettingOutlined />
            <span>Settings</span>
          </div>
        ),
        path: "TODO",
      },
    ] as SidebarInfo[];
  }, [projectId, subProjectId]);

  const handleNavigateSidebar = (itemInfo: SidebarInfo) => {
    navigate(itemInfo.path);
  };

  useEffect(() => {
    const currentTab = MENU_SIDEBAR().find(item => {
      if (item.path === location.pathname) {
        return true;
      }

      return undefined;
    });

    currentTab && setSelectedKey(currentTab.key);
  }, [MENU_SIDEBAR, location]);

  return (
    <div className={cx(styles.root)}>
      <Header fromSubProject />
      <div className="side-bar">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ marginTop: 76, border: "none" }}
          items={MENU_SIDEBAR().map(x => {
            return {
              ...x,
              label: x.label,
              onClick: () => handleNavigateSidebar(x),
            };
          })}
        />
      </div>
      <div className="container">
        <div className="header flex-space-between">
          <div className="flex-align-center">
            <Typography.Text className="font-weight-bold font-18 text-dark">
              {subProjectDetail?.subProjectName}
            </Typography.Text>
            <Typography.Text className="ml-2">{`(${subProjectDetail?.subTitle})`}</Typography.Text>
          </div>
          <div
            className="flex-align-center memberBox"
            onClick={() => setIsProjectMembersModalOpen(true)}
          >
            {visibleMembers?.map(member => (
              <Tooltip key={member.userId} title={member.username}>
                {member.user.avatarUrl ? (
                  <img
                    className="avatar"
                    src={member.user.avatarUrl}
                    alt="avatar"
                  />
                ) : (
                  <div className="avatar flex-center">
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </Tooltip>
            ))}
            {additionalMembers > 0 && (
              <Tooltip title="Other members">
                <div className="additionalMembers flex-center bg-primary font-13">
                  +{additionalMembers}
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        <div className="pageContent overflow-scroll">{children}</div>
      </div>
      {isProjectMembersModalOpen && (
        <ProjectMembersModal
          members={projectMembers}
          open={isProjectMembersModalOpen}
          onCancel={() => setIsProjectMembersModalOpen(false)}
        />
      )}
    </div>
  );
};
export default memo(DefaultLayout);
