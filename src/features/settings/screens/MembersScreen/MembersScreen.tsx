import { memo, useEffect, useMemo, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input, Modal, Select, Table, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import useDeleteMember from "@/features/project/hooks/useDeleteMember";
import useGetMemberDetail from "@/features/project/hooks/useGetMemberDetail";
import useGetProjectMembers from "@/features/project/hooks/useGetProjectMembers";
import useUpdateMemberRole from "@/features/project/hooks/useUpdateMemberRole";

import styles from "./MembersScreen.module.scss";
import AddMemberModal from "../../components/AddMemberModal/AddMemberModal";
import {
  MEMBER_ROLE_OPTIONS,
  MEMBER_TABLE_COLUMNS,
} from "../../constants/settings.constants";
import { SettingPaths } from "../../constants/settings.path";

const MembersScreen = () => {
  const [form] = useForm();

  const navigate = useNavigate();
  const { projectId, subProjectId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { memberDetail } = useGetMemberDetail(
    String(projectId),
    String(localStorage.getItem(USER_ID))
  );
  const { updateMemberRole, isUpdateMemberRoleLoading } = useUpdateMemberRole(
    String(projectId)
  );
  const { deleteMember, isDeleteMemberLoading } = useDeleteMember(
    String(projectId)
  );
  const { projectMembers, isGetProjectMembersLoading, refetchProjectsMembers } =
    useGetProjectMembers(String(projectId), {
      keyword: searchParams.get("keyword"),
      role: searchParams.get("role"),
      page: searchParams.get("page"),
    });

  const [isDeleteMemberModalOpen, setIsDeleteMemberModalOpen] =
    useState<number>();
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateMemberRole = (memberId: number, role: number) => {
    updateMemberRole({ memberId, role: role === 1 ? 0 : 1 })
      .then(() => {
        openNotification({
          type: "success",
          message: "You have successfully updated a member",
        });
      })
      .then(() => setTriggerReload(!triggerReload));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDeleteMember = () => {
    deleteMember(String(isDeleteMemberModalOpen)).then(() => {
      openNotification({
        type: "success",
        message: "You have successfully deleted a member",
      });
      setTriggerReload(!triggerReload);
      setIsDeleteMemberModalOpen(undefined);
    });
  };

  const membersTableData = useMemo(() => {
    return projectMembers?.data.map(member => ({
      username: (
        <div className="d-flex">
          {member.user.avatarUrl ? (
            <img src={member.user.avatarUrl} alt="avatar" className="avatar" />
          ) : (
            <div className="avatar flex-center font-12">
              {member.username.charAt(0).toUpperCase()}
            </div>
          )}
          <Typography.Text className="ml-2">{member.username}</Typography.Text>
        </div>
      ),
      role: <div>{member.role ? "Admin" : "Member"}</div>,
      joinedDate: (
        <Typography>
          {dayjs(member.joinedDate).format("MMM DD, YYYY")}
        </Typography>
      ),
      action: memberDetail?.role &&
        Number(localStorage.getItem(USER_ID)) !== member.userId && (
          <div className="flex-center">
            <Button
              disabled={isUpdateMemberRoleLoading}
              onClick={() => handleUpdateMemberRole(member.userId, member.role)}
              type="default"
            >
              {member.role ? "Demote" : "Promote"}
            </Button>
            <Button
              onClick={() => setIsDeleteMemberModalOpen(member.userId)}
              className="button ml-2"
            >
              Remove
            </Button>
          </div>
        ),
    }));
  }, [
    handleUpdateMemberRole,
    isUpdateMemberRoleLoading,
    memberDetail?.role,
    projectMembers?.data,
  ]);

  useEffect(() => {
    form.setFieldValue("keyword", searchParams.get("keyword"));
  }, [form, searchParams]);

  useEffect(() => {
    refetchProjectsMembers();
  }, [refetchProjectsMembers, searchParams, triggerReload]);

  return (
    <div className={styles.container}>
      <div className="flex-space-between-center">
        <Typography className="font-16 font-weight-bold">{`Project Members (${projectMembers?.meta.totalMember} members)`}</Typography>
        <Typography
          className="hoverTextUnderline cursor-pointer hoverBolder"
          onClick={() =>
            navigate(
              SettingPaths.SETTING(String(projectId), String(subProjectId))
            )
          }
        >
          Back to Setting
        </Typography>
      </div>
      <div className="filter flex-align-center mt-4">
        <Typography.Text>Filter user</Typography.Text>
        <Form form={form} className="flex-align-center">
          <Item name="keyword" className="mb-0">
            <Input
              onPressEnter={(e: any) => {
                e.target.value
                  ? searchParams.set("keyword", e.target.value)
                  : searchParams.delete("keyword");
                setSearchParams(searchParams);
              }}
              placeholder="Search in Username"
              prefix={<SearchOutlined className="searchIcon" />}
              className="searchInput ml-3"
            />
          </Item>
          <Item name="role" className="mb-0">
            <Select
              onChange={role => {
                role
                  ? searchParams.set("role", role)
                  : (searchParams.delete("role"),
                    form.setFieldValue("role", ""));
                setSearchParams(searchParams);
              }}
              defaultValue={MEMBER_ROLE_OPTIONS[0].value}
              className="roleSelect ml-3"
              options={MEMBER_ROLE_OPTIONS}
            />
          </Item>
        </Form>
      </div>
      {!!memberDetail?.role && (
        <Button
          onClick={() => setIsAddMemberModalOpen(true)}
          className="button mt-6"
        >
          Add a member
        </Button>
      )}
      <Table
        loading={isGetProjectMembersLoading || isUpdateMemberRoleLoading}
        dataSource={membersTableData}
        columns={MEMBER_TABLE_COLUMNS}
        className="membersTable mt-2"
        pagination={{
          current: projectMembers?.meta.page
            ? Number(projectMembers?.meta.page)
            : 1,
          total: projectMembers?.meta.totalRecord,
          pageSize: 20,
          position: ["topLeft", "bottomLeft"],
          onChange: e => {
            searchParams.set("page", String(e));
            setSearchParams(searchParams);
          },
        }}
      />
      <Modal
        title="Delete a member"
        open={!!isDeleteMemberModalOpen}
        onOk={handleDeleteMember}
        onCancel={() => setIsDeleteMemberModalOpen(undefined)}
        okButtonProps={{ disabled: isDeleteMemberLoading }}
        okText="Delete"
      >
        Are you sure you want to delete this member?
      </Modal>
      {isAddMemberModalOpen && (
        <AddMemberModal
          open={isAddMemberModalOpen}
          onCancel={() => setIsAddMemberModalOpen(false)}
          refetchMembers={() => {
            refetchProjectsMembers();
            setIsAddMemberModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default memo(MembersScreen);
