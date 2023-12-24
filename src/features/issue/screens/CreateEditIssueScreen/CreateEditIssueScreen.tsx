import { memo, useEffect, useMemo, useState } from "react";

import { DatePicker, Input, InputNumber, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import cx from "classnames";
import dayjs from "dayjs";
import { isEqual } from "lodash";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import useGetProjectMembers from "@/features/project/hooks/useGetProjectMembers";
import { SubProject } from "@/features/project/types/project.types";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./CreateEditIssueScreen.module.scss";
import { IssuePaths } from "../../constants/issue.paths";
import useCreateIssue from "../../hooks/useCreateIssue";
import useGetIssueDetail from "../../hooks/useGetIssueDetail";
import useGetMasterIssueTypes from "../../hooks/useGetMasterIssueTypes";
import useUpdateIssue from "../../hooks/useUpdateIssue";

interface CreateEditIssueScreenProps {
  closeModal?: () => void;
  subProject?: SubProject;
}

export const statusOptions = [
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

const CreateEditIssueScreen = ({
  closeModal,
  subProject,
}: CreateEditIssueScreenProps) => {
  const [form] = useForm();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { projectId, subProjectId, issueId } = useParams();

  const { masterIssueTypes } = useGetMasterIssueTypes(String(projectId));
  const { projectMembers } = useGetProjectMembers(String(projectId));
  const { createIssue, isCreateIssueLoading } = useCreateIssue(
    String(subProject?.id ?? subProjectId)
  );
  const { updateIssue, isUpdateIssueLoading } = useUpdateIssue(String(issueId));

  const { issueDetail } = useGetIssueDetail(
    issueId ? String(issueId) : undefined
  );

  const [initialFormValue, setInitialFormValue] = useState<any>();

  const memberOptions = useMemo(() => {
    return projectMembers?.data.map(member => {
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

  const handleCreateEditIssue = () => {
    !issueId
      ? createIssue({
          ...form.getFieldsValue(),
          creatorId: String(localStorage.getItem(USER_ID)),
        }).then((res: any) => {
          openNotification({
            type: "success",
            message: "You have successfully created an issue",
          });
          closeModal?.();
          navigate(
            IssuePaths.ISSUE_DETAIL(
              String(projectId),
              String(res.subProjectId),
              String(res.id)
            )
          );
        })
      : updateIssue({
          ...form.getFieldsValue(),
          updaterId: String(localStorage.getItem(USER_ID)),
        }).then(() => {
          openNotification({
            type: "success",
            message: "You have successfully updated this issue",
          });
          navigate(pathname.split("/edit")[0]);
        });
  };

  useEffect(() => {
    issueId &&
      (form.setFieldsValue({
        type: issueDetail?.type,
        subject: issueDetail?.subject,
        description: issueDetail?.description,
        priority: issueDetail?.priority,
        status: issueDetail?.status,
        assigneeId: issueDetail?.assigneeUserId,
        startDate: issueDetail?.startDate
          ? dayjs(issueDetail?.startDate)
          : null,
        dueDate: issueDetail?.dueDate ? dayjs(issueDetail?.dueDate) : null,
        estimatedHour: issueDetail?.estimatedHour,
        actualHour: issueDetail?.actualHour,
      }),
      setInitialFormValue({
        type: issueDetail?.type,
        subject: issueDetail?.subject,
        description: issueDetail?.description,
        priority: issueDetail?.priority,
        status: issueDetail?.status,
        assigneeId: issueDetail?.assigneeUserId,
        startDate: issueDetail?.startDate
          ? dayjs(issueDetail?.startDate)
          : null,
        dueDate: issueDetail?.dueDate ? dayjs(issueDetail?.dueDate) : null,
        estimatedHour: issueDetail?.estimatedHour,
        actualHour: issueDetail?.actualHour,
      }));
  }, [form, issueDetail, issueId]);

  return (
    <div className={cx(styles.container, subProject ? "" : "mb-5")}>
      {subProject && (
        <div className="contentHeader">
          <Typography.Text className="font-16 font-weight-bold">
            {subProject.subProjectName}
          </Typography.Text>
          <Typography.Text className="font-12 font-weight-bold ml-2">
            {`(${subProject.subTitle})`}
          </Typography.Text>
        </div>
      )}
      <div className={subProject ? "mainContent" : ""}>
        <Typography className="font-16 font-weight-bold">
          {issueId ? "Edit Issue" : "Add Issue"}
        </Typography>
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
                name="estimatedHour"
                labelCol={{ span: 7 }}
                label="Estimated Hours"
                className="formBoxItem"
              >
                <InputNumber controls={false} className="inputNumber ml-10" />
              </Item>
              <Item
                name="actualHour"
                labelCol={{ span: 7 }}
                label="Actual Hours"
                className="formBoxItem"
              >
                <InputNumber controls={false} className="inputNumber ml-10" />
              </Item>
            </div>
            <Item className="text-right" shouldUpdate>
              {() => (
                <div>
                  {issueId && (
                    <Button
                      onClick={() =>
                        navigate(
                          IssuePaths.ISSUE_DETAIL(
                            String(projectId),
                            String(subProjectId),
                            String(issueId)
                          )
                        )
                      }
                      className="backButton font-weight-half-bold text-dark mr-2"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleCreateEditIssue}
                    className="addButton"
                    disabled={
                      issueId
                        ? isInvalidForm({
                            form,
                            fieldsRequire: [
                              "type",
                              "subject",
                              "description",
                              "status",
                              "assigneeId",
                            ],
                            isSubmitting:
                              isCreateIssueLoading || isUpdateIssueLoading,
                          }) || isEqual(form.getFieldsValue(), initialFormValue)
                        : isInvalidForm({
                            form,
                            fieldsRequire: [
                              "type",
                              "subject",
                              "description",
                              "status",
                              "assigneeId",
                            ],
                            isSubmitting:
                              isCreateIssueLoading || isUpdateIssueLoading,
                          })
                    }
                  >
                    {issueId ? "Save" : "Add"}
                  </Button>
                </div>
              )}
            </Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(CreateEditIssueScreen);
