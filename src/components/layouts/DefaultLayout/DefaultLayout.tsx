import { memo, useEffect, useState } from "react";

import { RightOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Divider,
  Dropdown,
  Menu,
  Space,
  Typography,
} from "antd";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { confirmPrompt } from "@/components/organisms/ConfirmPrompt/ConfirmPrompt";
import { MENU_SIDEBAR } from "@/constants/constants";
import ChangePasswordModal from "@/features/admins/components/ChangePasswordModal/ChangePasswordModal";
import useGetAdmin from "@/features/admins/hooks/useGetAdmin";
import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";
import useAuth from "@/features/auth/hooks/useAuth";
import { BreadCrumb } from "@/types/route.types";
import { SidebarInfo } from "@/types/sidebar.types";

import styles from "./DefaultLayout.module.scss";

interface DefaultLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  breadCrumb?: BreadCrumb[];
}
const DefaultLayout = ({
  children,
  pageTitle,
  breadCrumb,
}: DefaultLayoutProps) => {
  const { t } = useTranslation("header");
  const { t: tCommon } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  // const [form] = Form.useForm();

  const [selectedKey, setSelectedKey] = useState<string>("");

  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState<boolean>(false);

  const { postLogout, isPostLogoutLoading } = useAuth();
  const { admin } = useGetAdmin("123");
  // const { editAdmin, isEditAdminLoading } = useEditAdmin();

  const handleNavigateSidebar = (itemInfo: SidebarInfo) => {
    navigate(itemInfo.path);
  };

  useEffect(() => {
    const currentTab = MENU_SIDEBAR.find(item => {
      if (item.path === location.pathname) {
        return true;
      }
      // if (item.path !== DashboardPathsEnum.DASHBOARD) {
      //   return location.pathname.includes(item.path);
      // }
      return undefined;
    });
    currentTab && setSelectedKey(currentTab.key);
  }, [location]);

  // const handleSubmitChangePassword = (value: EditAdminRequestBody) => {
  //   editAdmin({ id: LOGGED_IN_USER_ID, password: value.password })
  //     .then(() => {
  //       setIsOpenChangePasswordModal(false);
  //       handleClearLocalStorage();
  //       navigate(AuthPathsEnum.LOGIN);
  //     })
  //     .catch(err => handleErrorSubmitted(form, err));
  // };

  return (
    <div className={cx(styles.root)}>
      <div className="side-bar">
        <div className="mt-6 text-center">
          <Typography.Text className="font-24 text-second">
            swag concierge
          </Typography.Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ marginTop: 76 }}
          items={MENU_SIDEBAR.map(x => {
            return {
              ...x,
              label: t(x.label),
              onClick: () => handleNavigateSidebar(x),
            };
          })}
        />
      </div>
      <div className="container">
        <div className="header flex-space-between-start">
          <div className="flex-direction-column">
            <Typography.Title level={1} className="mb-2">
              {t(pageTitle ?? "")}
            </Typography.Title>
            <Breadcrumb
              items={breadCrumb?.map(el => ({
                title: t(el.title ?? ""),
                path: el?.path,
              }))}
              separator={<RightOutlined />}
            />
          </div>
          <Space size={14} align="center">
            <Dropdown
              placement="bottomRight"
              menu={{
                items: [
                  {
                    label: (
                      <p className="text-right text-underline">
                        {tCommon("menu_notify.open_chat_box")}
                      </p>
                    ),
                    key: "2",
                  },
                ],
                className: "menu-notify",
              }}
              trigger={["click"]}
            >
              <Badge color="#3751FF" offset={[-3, 2]} dot>
                <span className="icon-notify font-16 ml-3" />
              </Badge>
            </Dropdown>
            <Divider type="vertical" className="mr-7" />
            {admin && (
              <Typography.Text
                className="ml-8 menu-profile font-14 text-right"
                ellipsis={{
                  tooltip: `${admin?.nameFamily}${admin?.nameFirst}`,
                }}
              >
                {`${admin?.nameFamily}${admin?.nameFirst}`}
              </Typography.Text>
            )}
            <Dropdown
              menu={{
                items: [
                  {
                    label: tCommon("menu_profile.profile"),
                    key: "0",
                    onClick: () => {
                      // TODO: Update spec
                    },
                  },
                  {
                    label: tCommon("menu_profile.change_password"),
                    className: "change-password",
                    key: "1",
                    onClick: () => setIsOpenChangePasswordModal(true),
                  },
                  {
                    label: tCommon("menu_profile.logout"),
                    key: "2",
                    disabled: isPostLogoutLoading,
                    onClick: () =>
                      confirmPrompt({
                        onOk: () =>
                          postLogout().then(() =>
                            navigate(AuthPathsEnum.LOGIN, { replace: true })
                          ),
                        title: tCommon("modal_confirm.logout_title"),
                      }),
                  },
                ],
                className: "menu-profile",
              }}
              trigger={["click"]}
            >
              <Avatar size={44} className="cursor-pointer">
                A
              </Avatar>
            </Dropdown>
          </Space>
        </div>
        <Divider />
        <div className="pageContent overflow-scroll">{children}</div>
      </div>
      <ChangePasswordModal
        isOpen={isOpenChangePasswordModal}
        onCancel={() => setIsOpenChangePasswordModal(false)}
        // onFinish={handleSubmitChangePassword}
        // isSubmitting={isEditAdminLoading}
      />
    </div>
  );
};
export default memo(DefaultLayout);
