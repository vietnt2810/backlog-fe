import { memo, useEffect, useMemo, useState } from "react";

import { UploadOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Input,
  InputNumber,
  Select,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { RcFile } from "antd/lib/upload/interface";
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
import { isInvalidForm, uploadFileToFirebase } from "@/utils/utils";

import styles from "./CreateEditIssueScreen.module.scss";
import useGetMasterIssueTypes from "../../../settings/hooks/useGetMasterIssueTypes";
import { IssuePaths } from "../../constants/issue.paths";
import useCreateIssue from "../../hooks/useCreateIssue";
import useGetIssueDetail from "../../hooks/useGetIssueDetail";
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

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploadToFireBase, setIsUploadToFireBase] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState<any>();

  const initialFileList: any = useMemo(() => {
    return issueDetail?.attachedFile?.map(file => {
      return {
        uid: file.fileUrl,
        name: file.fileName,
        url: file.fileUrl,
      };
    });
  }, [issueDetail?.attachedFile]);

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

  const handleCreateEditIssue = async () => {
    const attachedFileList: any[] = [];
    const updateFileList: any[] = [];

    const uploadPromises = fileList.map(async file => {
      setIsUploadToFireBase(true);
      file.originFileObj
        ? await uploadFileToFirebase(
            "attachedFile",
            String(Date.now()).concat(file.name),
            file.originFileObj as RcFile
          ).then(res => {
            attachedFileList.push({
              fileUrl: res.fileUrl,
              fileName: res.fileName,
            });
          })
        : updateFileList.push({
            fileUrl: file.url,
            fileName: file.name,
          });
    });

    await Promise.all(uploadPromises).finally(() =>
      setIsUploadToFireBase(false)
    );

    !issueId
      ? createIssue({
          ...form.getFieldsValue(),
          creatorId: String(localStorage.getItem(USER_ID)),
          attachedFile: attachedFileList.length ? attachedFileList : undefined,
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
          attachedFile: attachedFileList.concat(updateFileList),
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
      (setFileList(initialFileList || []),
      form.setFieldsValue({
        attachedFile: initialFileList,
        issueTypeId: issueDetail?.issueTypeId,
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
        attachedFile: initialFileList,
        issueTypeId: issueDetail?.issueTypeId,
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
  }, [form, initialFileList, issueDetail, issueId]);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [form, pathname]);

  return (
    <div className={cx(styles.container, subProject ? "" : "mb-5 pl-1")}>
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
          <Item name="issueTypeId" className="selectButtonItem my-3">
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
                required
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
                required
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
                required
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
            <Item name="attachedFile" className="uploadFile">
              <Upload
                beforeUpload={() => {
                  return false;
                }}
                fileList={fileList}
                onChange={e => {
                  setFileList(e.fileList);
                  !e.fileList.length &&
                    form.setFieldValue("attachedFile", null);
                }}
              >
                <Button className="uploadButton" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Item>
            <Item className="text-right mt-3" shouldUpdate>
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
                              "issueTypeId",
                              "subject",
                              "description",
                              "status",
                              "assigneeId",
                              "priority",
                            ],
                            isSubmitting:
                              isCreateIssueLoading ||
                              isUpdateIssueLoading ||
                              isUploadToFireBase,
                          }) || isEqual(form.getFieldsValue(), initialFormValue)
                        : isInvalidForm({
                            form,
                            fieldsRequire: [
                              "issueTypeId",
                              "subject",
                              "description",
                              "status",
                              "assigneeId",
                              "priority",
                            ],
                            isSubmitting:
                              isCreateIssueLoading ||
                              isUpdateIssueLoading ||
                              isUploadToFireBase,
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
