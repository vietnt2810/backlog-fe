import { memo, useMemo } from "react";

import { DatePicker, Input, InputNumber, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import cx from "classnames";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import useGetProjectMembers from "@/features/project/hooks/useGetProjectMembers";
import useGetUserIssues from "@/features/project/hooks/useGetUserIssues";
import { SubProject } from "@/features/project/types/project.types";
import { requiredRules } from "@/helpers/validations.helpers";
import { formatDate } from "@/utils/date";

import styles from "./CreateIssueScreen.module.scss";
import useCreateIssue from "../../hooks/useCreateIssue";
import useGetMasterIssueTypes from "../../hooks/useGetMasterIssueTypes";

interface CreateIssueScreenProps {
  closeModal?: () => void;
  subProject: SubProject;
}

const CreateIssueScreen = ({
  closeModal,
  subProject,
}: CreateIssueScreenProps) => {
  const [form] = useForm();

  const { projectId } = useParams();
  const { masterIssueTypes } = useGetMasterIssueTypes(String(projectId));
  const { projectMembers } = useGetProjectMembers(String(projectId));
  const { createIssue, isCreateIssueLoading } = useCreateIssue(
    String(subProject.id)
  );
  const { refetchUserIssues } = useGetUserIssues(
    String(projectId),
    String(localStorage.getItem(USER_ID))
  );

  const statusOptions = [
    {
      label: (
        <div className={styles.selectOption}>
          <div className={cx(styles.statusCircle, "bg-status-color-1 mr-2")} />
          <Typography.Text>Open</Typography.Text>
        </div>
      ),
      value: 1,
    },
    {
      label: (
        <div className={styles.selectOption}>
          <div className={cx(styles.statusCircle, "bg-status-color-2 mr-2")} />
          <Typography.Text>In Progress</Typography.Text>
        </div>
      ),
      value: 2,
    },
    {
      label: (
        <div className={styles.selectOption}>
          <div className={cx(styles.statusCircle, "bg-status-color-3 mr-2")} />
          <Typography.Text>Resolved</Typography.Text>
        </div>
      ),
      value: 3,
    },
    {
      label: (
        <div className={styles.selectOption}>
          <div className={cx(styles.statusCircle, "bg-status-color-4 mr-2")} />
          <Typography.Text>Pending</Typography.Text>
        </div>
      ),
      value: 4,
    },
    {
      label: (
        <div className={styles.selectOption}>
          <div className={cx(styles.statusCircle, "bg-status-color-5 mr-2")} />
          <Typography.Text>Closed</Typography.Text>
        </div>
      ),
      value: 5,
    },
  ];

  const memberOptions = useMemo(() => {
    return projectMembers?.map(member => {
      return {
        label: (
          <div className={styles.selectOption}>
            {member?.user?.avatarUrl ? (
              <img
                alt="avatar"
                src={member?.user?.avatarUrl}
                className={styles.memberAvatarOption}
              />
            ) : (
              <div className={styles.memberAvatarOption} />
            )}

            <Typography.Text
              title={member?.username}
              className="ml-2 text-ellipsis"
            >
              {member?.username}
            </Typography.Text>
          </div>
        ),
        value: member?.userId,
      };
    });
  }, [projectMembers]);

  const priorityOption = [
    {
      label: "High",
      value: 1,
    },
    {
      label: "Normal",
      value: 2,
    },
    {
      label: "Low",
      value: 3,
    },
  ];

  const handleCreateIssue = () => {
    createIssue({
      ...form.getFieldsValue(),
      startDate: formatDate(form.getFieldValue("startDate")),
      dueDate: formatDate(form.getFieldValue("dueDate")),
      createdByUserId: String(localStorage.getItem(USER_ID)),
    }).then(() => {
      openNotification({
        type: "success",
        message: "You have sucessfully created an issue",
      });
      closeModal?.();
      refetchUserIssues();
    });
  };

  return (
    <div className={styles.container}>
      <div className="contentHeader">
        <Typography.Text className="font-16 font-weight-bold">
          {subProject.subProjectName}
        </Typography.Text>
        <Typography.Text className="font-12 font-weight-bold ml-2">
          {`(${subProject.subTitle})`}
        </Typography.Text>
      </div>
      <div className="mainContent">
        <Typography className="font-16 font-weight-bold">Add Issue</Typography>
        <Form form={form} colon={false}>
          <Item name="type" className="selectButtonItem my-3">
            <Select
              allowClear
              placeholder="Type"
              options={masterIssueTypes?.map(masterIssueType => {
                return {
                  label: masterIssueType.issueType,
                  value: masterIssueType.id,
                };
              })}
            />
          </Item>
          <Item name="subject" rules={[...requiredRules("subject")]}>
            <Input placeholder="Subject" />
          </Item>
          <div className="formBox mt-3">
            <Item name="description" rules={[...requiredRules("description")]}>
              <TextArea
                placeholder="Add a description"
                className="issueDescription"
              />
            </Item>
            <div className="flex-space-between">
              <Item
                name="status"
                labelCol={{ span: 7 }}
                label="Status"
                className="mt-3 formBoxItem"
              >
                <Select
                  allowClear
                  options={statusOptions}
                  className="selectButtonItem ml-10"
                />
              </Item>
              <Item
                name="assigneeId"
                labelCol={{ span: 7 }}
                label="Assignee"
                className="mt-3 formBoxItem"
              >
                <Select
                  allowClear
                  options={memberOptions}
                  className="selectButtonItem ml-10"
                />
              </Item>
            </div>
            <div className="flex-space-between">
              <Item
                name="priority"
                labelCol={{ span: 7 }}
                label="Priority"
                className="formBoxItem"
              >
                <Select
                  allowClear
                  options={priorityOption}
                  className="selectButtonItem ml-10"
                />
              </Item>
            </div>
            <div className="flex-space-between">
              <Item
                name="startDate"
                labelCol={{ span: 7 }}
                label="Start Date"
                className="formBoxItem"
              >
                <DatePicker className="datePicker ml-10" />
              </Item>
              <Item
                name="dueDate"
                labelCol={{ span: 7 }}
                label="Due Date"
                className="formBoxItem"
              >
                <DatePicker className="datePicker ml-10" />
              </Item>
            </div>
            <div className="flex-space-between">
              <Item
                name="estimatedHours"
                labelCol={{ span: 7 }}
                label="Estimated Hours"
                className="formBoxItem"
              >
                <InputNumber controls={false} className="inputNumber ml-10" />
              </Item>
              <Item
                name="actualHours"
                labelCol={{ span: 7 }}
                label="Actual Hours"
                className="formBoxItem"
              >
                <InputNumber controls={false} className="inputNumber ml-10" />
              </Item>
            </div>
            <Item
              className="text-right"
              shouldUpdate={(prevValues, curValues) => prevValues === curValues}
            >
              {() => (
                <Button
                  onClick={handleCreateIssue}
                  className="addButton"
                  disabled={isCreateIssueLoading}
                >
                  Add
                </Button>
              )}
            </Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(CreateIssueScreen);
