import { memo, useMemo, useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Table, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import useDeleteMasterIssueType from "@/features/issue/hooks/useDeleteMasterIssueType";
import useGetMasterIssueTypes from "@/features/issue/hooks/useGetMasterIssueTypes";
import useGetMemberDetail from "@/features/project/hooks/useGetMemberDetail";

import styles from "./IssueTypesScreen.module.scss";
import AddIssueTypeModal from "../../components/AddIssueTypeModal/AddIssueTypeModal";
import { ISSUE_TYPES_TABLE_COLUMNS } from "../../constants/settings.constants";
import { SettingPaths } from "../../constants/settings.path";

const IssueTypesScreen = () => {
  const navigate = useNavigate();
  const { projectId, subProjectId } = useParams();

  const { memberDetail } = useGetMemberDetail(
    String(projectId),
    String(localStorage.getItem(USER_ID))
  );
  const {
    isGetMasterIssueTypesLoading,
    masterIssueTypes,
    refetchMasterIssueTypes,
  } = useGetMasterIssueTypes(String(projectId));
  const { deleteIssueType, isDeleteIssueTypeLoading } =
    useDeleteMasterIssueType();

  const [isAddIssueTypeModalOpen, setIsAddIssueTypeModalOpen] = useState(false);
  const [isDeleteIssueTypeModalOpen, setIsDeleteIssueTypeModalOpen] =
    useState<number>();

  const issueTypesTableData = useMemo(() => {
    return masterIssueTypes?.map(issueType => ({
      issueType: <Typography>{issueType.issueType}</Typography>,
      action: memberDetail?.role && !issueType.isCommon && (
        <DeleteOutlined
          className="hoverBolder"
          onClick={() => setIsDeleteIssueTypeModalOpen(issueType.id)}
        />
      ),
    }));
  }, [masterIssueTypes, memberDetail?.role]);

  const handleDeleteIssueType = () => {
    deleteIssueType(String(isDeleteIssueTypeModalOpen)).then(() => {
      openNotification({
        type: "success",
        message: "You have successfully deleted an issue type",
      });
      refetchMasterIssueTypes();
      setIsDeleteIssueTypeModalOpen(undefined);
    });
  };

  return (
    <div className={styles.container}>
      <div className="flex-space-between-center">
        <Typography className="font-16 font-weight-bold">
          Edit Issue Types
        </Typography>
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
      {memberDetail?.role && (
        <Button
          onClick={() => setIsAddIssueTypeModalOpen(true)}
          className="button mt-4"
        >
          Add Issue Type
        </Button>
      )}
      <Table
        loading={isGetMasterIssueTypesLoading}
        dataSource={issueTypesTableData}
        columns={ISSUE_TYPES_TABLE_COLUMNS}
        className="issueTypesTable mt-6"
        pagination={false}
      />
      <Modal
        title="Delete an issue type"
        open={!!isDeleteIssueTypeModalOpen}
        onOk={handleDeleteIssueType}
        onCancel={() => setIsDeleteIssueTypeModalOpen(undefined)}
        okButtonProps={{ disabled: isDeleteIssueTypeLoading }}
        okText="Delete"
      >
        Are you sure you want to delete this issue type?
      </Modal>
      {isAddIssueTypeModalOpen && (
        <AddIssueTypeModal
          open={isAddIssueTypeModalOpen}
          onCancel={() => setIsAddIssueTypeModalOpen(false)}
          refetchIssueTypes={() => {
            refetchMasterIssueTypes();
            setIsAddIssueTypeModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default memo(IssueTypesScreen);
