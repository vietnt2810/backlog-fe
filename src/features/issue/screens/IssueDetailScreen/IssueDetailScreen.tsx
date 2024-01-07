/* eslint-disable no-nested-ternary */
import { memo, useEffect, useMemo, useState } from "react";

import { FireOutlined, UploadOutlined } from "@ant-design/icons";
import {
  DatePicker,
  InputNumber,
  Select,
  Typography,
  Upload,
  UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { RcFile } from "antd/es/upload";
import cx from "classnames";
import dayjs from "dayjs";
import { isEmpty, isEqual } from "lodash";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ChangeArrowIcon } from "@/assets/images/changeArrow.svg";
import { ReactComponent as HighPriorityIcon } from "@/assets/images/highPriorityArrow.svg";
import { ReactComponent as LowPriorityIcon } from "@/assets/images/lowPriorityArrow.svg";
import { ReactComponent as NormalPriorityIcon } from "@/assets/images/normalPriorityArrow.svg";
import { ReactComponent as NotebookIcon } from "@/assets/images/notebookIcon.svg";
import { ReactComponent as PencilIcon } from "@/assets/images/pencilIcon.svg";
import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import Loader from "@/components/organisms/Loader/Loader";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import { statusTexts } from "@/features/project/constants/project.constants";
import useGetProjectMembers from "@/features/project/hooks/useGetProjectMembers";
import useGetRecentlyViewedIssues from "@/features/project/hooks/useGetRecentlyViewedIssues";
import useUpdateRecentlyViewedIssues from "@/features/project/hooks/useUpdateRecentlyViewedIssues";
import {
  downloadFile,
  isImageFile,
  isInvalidForm,
  uploadFileToFirebase,
} from "@/utils/utils";

import styles from "./IssueDetailScreen.module.scss";
import useGetIssueDetail from "../../hooks/useGetIssueDetail";
import useGetIssueHistory from "../../hooks/useGetIssueHistory";
import useUpdateIssue from "../../hooks/useUpdateIssue";
import { statusOptions } from "../CreateEditIssueScreen/CreateEditIssueScreen";

const IssueDetailScreen = () => {
  const [form] = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const { projectId, issueId } = useParams();

  const { projectMembers } = useGetProjectMembers(String(projectId));
  const { issueHistory, refetchIssueHistory } = useGetIssueHistory(
    String(issueId)
  );
  const { isGetIssueDetailLoading, issueDetail, refetchIssueDetail } =
    useGetIssueDetail(String(issueId));
  const { isUpdateIssueLoading, updateIssue } = useUpdateIssue(String(issueId));
  const { refetchRecentlyViewedIssues } = useGetRecentlyViewedIssues(
    String(projectId),
    String(localStorage.getItem(USER_ID))
  );
  const { updateRecentlyViewedIssues } = useUpdateRecentlyViewedIssues(
    String(projectId),
    String(localStorage.getItem(USER_ID))
  );

  const [isUpdateIssueFormOpen, setIsUpdateIssueFormOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isUploadToFireBase, setIsUploadToFireBase] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState<any>();

  const currentDate = dayjs();

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

  const tableStatusTexts: Record<number, React.ReactNode> = {
    1: <div className="bg-status-color-1 status">Open</div>,
    2: <div className="bg-status-color-2 status">In progress</div>,
    3: <div className="bg-status-color-3 status">Resolved</div>,
    4: <div className="bg-status-color-4 status">Pending</div>,
    5: <div className="bg-status-color-5 status">Closed</div>,
  };

  const handleUpdateIssue = async () => {
    const attachedFileList: any[] = [];

    const uploadPromises = fileList.map(async file => {
      setIsUploadToFireBase(true);
      await uploadFileToFirebase(
        "attachedFile",
        String(Date.now()).concat(file.name),
        file.originFileObj as RcFile
      ).then(res => {
        attachedFileList.push({
          fileUrl: res.fileUrl,
          fileName: res.fileName,
        });
      });
    });

    await Promise.all(uploadPromises).finally(() => {
      setIsUploadToFireBase(false);
      setFileList([]);
    });

    updateIssue({
      ...form.getFieldsValue(),
      updaterId: String(localStorage.getItem(USER_ID)),
      attachedFile: attachedFileList.length ? attachedFileList : undefined,
      comment: form.getFieldValue("comment")
        ? form.getFieldValue("comment")
        : "",
    }).then(() => {
      openNotification({
        type: "success",
        message: "You have successfully updated this issue",
      });
      refetchIssueDetail();
      refetchIssueHistory();
      setIsUpdateIssueFormOpen(false);
      form.setFieldValue("comment", undefined);
    });
  };

  useEffect(() => {
    updateRecentlyViewedIssues(String(issueId)).finally(() =>
      refetchRecentlyViewedIssues()
    );
  }, [issueId, refetchRecentlyViewedIssues, updateRecentlyViewedIssues]);

  useEffect(() => {
    setTimeout(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.style.backgroundColor = "#fcfade";
        }
      }
    }, 500);
  }, [location.hash]);

  useEffect(() => {
    setInitialFormValue({
      attachedFile: undefined,
      comment: undefined,
      status: issueDetail?.status,
      assigneeId: issueDetail?.assigneeUserId,
      startDate: issueDetail?.startDate ? dayjs(issueDetail?.startDate) : null,
      dueDate: issueDetail?.dueDate ? dayjs(issueDetail?.dueDate) : null,
      estimatedHour: issueDetail?.estimatedHour,
      actualHour: issueDetail?.actualHour,
    });
  }, [form, issueDetail]);

  if (isGetIssueDetailLoading) {
    return <Loader />;
  }

  return (
    <div
      className={cx(
        styles.container,
        isUpdateIssueFormOpen ? "padding-bottom-update-issue" : ""
      )}
    >
      <div className="flex-space-between">
        <div className="d-flex">
          <Typography.Text
            className="issueType flex-align-center"
            style={{ background: issueDetail?.issueTypeColor }}
          >
            {issueDetail?.issueType}
          </Typography.Text>
          <Typography.Text className="ml-1">
            {issueDetail?.issueKey}
          </Typography.Text>
        </div>
        <div className="flex-align-baseline">
          <Typography.Text className="font-13 text-dark-30">
            Start Date
          </Typography.Text>
          <Typography.Text className="ml-1">
            {issueDetail?.startDate
              ? dayjs(issueDetail?.startDate).format("ddd MMM. DD, YYYY")
              : ""}
          </Typography.Text>
          <Typography.Text className="mx-1">-</Typography.Text>
          <Typography.Text className="font-13 text-dark-30">
            Due Date
          </Typography.Text>
          <Typography.Text
            className={
              dayjs(issueDetail?.dueDate).isBefore(currentDate)
                ? "expiredDueDate ml-1"
                : "ml-1 mr-3"
            }
          >
            {issueDetail?.dueDate
              ? dayjs(issueDetail?.dueDate).format("ddd MMM. DD, YYYY")
              : ""}
          </Typography.Text>
          {dayjs(issueDetail?.dueDate).isBefore(currentDate) && (
            <Typography.Text>
              <FireOutlined className="ml-1 expiredDueDate mr-3" />
            </Typography.Text>
          )}
          {tableStatusTexts[Number(issueDetail?.status)]}
        </div>
      </div>
      <div className="flex-space-between-center my-4">
        <Typography className="font-20 font-weight-bold">
          {issueDetail?.subject}
        </Typography>
        <Button
          onClick={() => navigate("edit")}
          className="editButton flex-align-center"
        >
          <PencilIcon className="icon mr-1" />
          <Typography.Text className="text-dark-30">Edit</Typography.Text>
        </Button>
      </div>
      <div className="issueDetailBox mt-2">
        <div className="flex-align-center">
          {issueDetail?.creatorAvatarUrl ? (
            <img
              alt="avatar"
              src={issueDetail.creatorAvatarUrl}
              className="creatorAvatar"
            />
          ) : (
            <div className="creatorAvatar flex-center">
              {issueDetail?.creatorUsername.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="ml-2">
            <Typography className="font-weight-bold">
              {issueDetail?.creatorUsername}
              {!!issueDetail?.isCreatorRemoved && (
                <span className="text-dark-10 ml-1">(Deactivated)</span>
              )}
            </Typography>
            <Typography className="text-dark-30 font-13">{`Created ${dayjs(
              issueDetail?.createdAt
            ).format("ddd MMM. DD, YYYY HH:mm:ss")}`}</Typography>
          </div>
        </div>
        <Typography>
          <pre>{issueDetail?.description}</pre>
        </Typography>
        <div className="flex-space-between mt-2">
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Priority</Typography>
            {issueDetail?.priority === 1 ? (
              <div className="flex-align-center">
                <HighPriorityIcon className="priorityIcon" />
                <Typography.Text className="priorityText">High</Typography.Text>
              </div>
            ) : issueDetail?.priority === 2 ? (
              <div className="flex-align-center">
                <NormalPriorityIcon className="priorityIcon" />
                <Typography.Text className="priorityText">
                  Normal
                </Typography.Text>
              </div>
            ) : (
              <div className="flex-align-center">
                <LowPriorityIcon className="priorityIcon" />
                <Typography.Text className="priorityText">Low</Typography.Text>
              </div>
            )}
          </div>
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Assignee</Typography>
            <div className="flex-align-center">
              {issueDetail?.assigneeAvatarUrl ? (
                <img
                  alt="avatar"
                  src={issueDetail.assigneeAvatarUrl}
                  className="assigneeAvatar"
                />
              ) : (
                <div className="assigneeAvatar flex-center font-13">
                  {issueDetail?.assigneeUsername.charAt(0).toUpperCase()}
                </div>
              )}
              <Typography className="ml-2">
                {issueDetail?.assigneeUsername}
              </Typography>
              {!!issueDetail?.isAssigneeRemoved && (
                <Typography className="text-dark-10 ml-1">
                  (Deactivated)
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className="flex-space-between mt-2">
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Estimated Hours</Typography>
            <Typography>{issueDetail?.estimatedHour}</Typography>
          </div>
          <div className="flex-space-between issueDetailField">
            <Typography className="text-dark-30">Actual Hours</Typography>
            <Typography>{issueDetail?.estimatedHour}</Typography>
          </div>
        </div>
        {issueDetail?.attachedFile && (
          <div className="mt-2">
            <div className="d-flex attachedImageBox">
              {issueDetail?.attachedFile.map(file => (
                <>
                  {isImageFile(file.fileName) && (
                    <img
                      src={file.fileUrl}
                      alt="attachedFile"
                      className="attachedImage"
                    />
                  )}
                </>
              ))}
            </div>
            {issueDetail?.attachedFile.find(
              file => !isImageFile(file.fileName)
            ) && (
              <Typography className="font-weight-half-bold mt-4">
                Attached Files
              </Typography>
            )}
            <div className="mt-2">
              {issueDetail?.attachedFile.map(file => (
                <>
                  {!isImageFile(file.fileName) && (
                    <Typography
                      className="attachedFile text-pink cursor-pointer hoverTextUnderline"
                      onClick={() => downloadFile(file.fileUrl)}
                    >
                      {file.fileName}
                    </Typography>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
      <Typography className="font-weight-half-bold font-16 mt-6">
        Comments
      </Typography>
      <div className="historyBox mt-3">
        {issueHistory?.map(item => (
          <div
            id={`comment-${String(item.id)}`}
            className="issueHistoryItem"
            key={item.createdAt}
          >
            <div className="d-flex">
              {item?.creatorAvatarUrl ? (
                <img
                  alt="avatar"
                  src={item.creatorAvatarUrl}
                  className="creatorAvatar"
                />
              ) : (
                <div className="creatorAvatar flex-center">
                  {item?.creatorUsername.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="ml-2">
                <Typography className="font-weight-half-bold">
                  {item.creatorUsername}
                </Typography>
                <Typography className="font-12 text-dark-30">
                  {dayjs(item?.createdAt).format("ddd MMM. DD, YYYY HH:mm:ss")}
                </Typography>
              </div>
            </div>
            <div className="historyContent mt-3">
              <Typography className="font-12 itemContent">
                {item.updateType === "create"
                  ? "Created this issue"
                  : "Updated this issue"}
              </Typography>

              {item.oldStatus && (
                <Typography className="font-12 itemContent flex-align-center">
                  {`Status: ${statusTexts[item.oldStatus]}`}
                  <ChangeArrowIcon className="icon mx-1" />
                  {statusTexts[item.newStatus]}
                </Typography>
              )}
              {item.assignerUsername && (
                <Typography className="font-12 itemContent flex-align-center">
                  {`Assignee: ${item.assignerUsername}`}
                  <ChangeArrowIcon className="icon mx-1" />
                  {item.assigneeUsername}
                </Typography>
              )}
              {item.oldStartDate !== null && (
                <Typography className="font-12 itemContent flex-align-center">
                  {`Start Date: ${
                    item.oldStartDate
                      ? dayjs(item.oldStartDate).format("ddd MMM. DD, YYYY")
                      : ""
                  }`}
                  <ChangeArrowIcon className="icon mx-1" />
                  {item.newStartDate
                    ? dayjs(item.newStartDate).format("ddd MMM. DD, YYYY")
                    : "Unset"}
                </Typography>
              )}
              {item.oldDueDate !== null && (
                <Typography className="font-12 itemContent flex-align-center">
                  {`Due Date: ${
                    item.oldDueDate
                      ? dayjs(item.oldDueDate).format("ddd MMM. DD, YYYY")
                      : ""
                  }`}
                  <ChangeArrowIcon className="icon mx-1" />
                  {item.newDueDate
                    ? dayjs(item.newDueDate).format("ddd MMM. DD, YYYY")
                    : "Unset"}
                </Typography>
              )}
              {item.oldEstimatedHour !== null && (
                <Typography className="font-12 itemContent flex-align-center">
                  {`Estimated Hour: ${item.oldEstimatedHour}`}
                  <ChangeArrowIcon className="icon mx-1" />
                  {item.newEstimatedHour ? item.newEstimatedHour : "Unset"}
                </Typography>
              )}
              {item.oldActualHour !== null && (
                <Typography className="font-12 itemContent flex-align-center">
                  {`Actual Hour: ${item.oldActualHour}`}
                  <ChangeArrowIcon className="icon mx-1" />
                  {item.newActualHour ? item.newActualHour : "Unset"}
                </Typography>
              )}
              {item.content && (
                <Typography>
                  <pre>{item.content}</pre>
                </Typography>
              )}
              {item.attachedFile && (
                <div className="mt-2">
                  <div className="d-flex attachedImageBox">
                    {item.attachedFile.map(file => (
                      <>
                        {isImageFile(file.fileName) && (
                          <img
                            src={file.fileUrl}
                            alt="attachedFile"
                            className="attachedImage"
                          />
                        )}
                      </>
                    ))}
                  </div>
                  {item.attachedFile.find(
                    file => !isImageFile(file.fileName)
                  ) && (
                    <Typography className="font-weight-half-bold mt-4">
                      Attached Files
                    </Typography>
                  )}
                  <div className="mt-2">
                    {item.attachedFile.map(file => (
                      <>
                        {!isImageFile(file.fileName) && (
                          <Typography
                            className="attachedFile text-pink cursor-pointer hoverTextUnderline"
                            onClick={() => downloadFile(file.fileUrl)}
                          >
                            {file.fileName}
                          </Typography>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="updateIssueFooter">
        <Form form={form} colon={false} layout="vertical">
          <div className="flex-space-between">
            <Item
              name="comment"
              className={
                isUpdateIssueFormOpen
                  ? "commentItem mb-0"
                  : "initialCommentItem py-4 mb-0"
              }
            >
              <TextArea
                onChange={e =>
                  isEmpty(e.target.value) &&
                  form.setFieldValue("comment", undefined)
                }
                autoSize={false}
                onFocus={() => setIsUpdateIssueFormOpen(true)}
                placeholder="Write a comment"
                className={
                  isUpdateIssueFormOpen ? "commentInput" : "initialCommentInput"
                }
              />
            </Item>
            {!isUpdateIssueFormOpen ? (
              <Item className="mb-0 flex-align-center">
                <Button
                  onClick={() => {
                    setIsUpdateIssueFormOpen(true);
                    form.setFieldsValue({
                      attachedFile: undefined,
                      status: issueDetail?.status,
                      assigneeId: issueDetail?.assigneeUserId,
                      startDate: issueDetail?.startDate
                        ? dayjs(issueDetail?.startDate)
                        : null,
                      dueDate: issueDetail?.dueDate
                        ? dayjs(issueDetail?.dueDate)
                        : null,
                      estimatedHour: issueDetail?.estimatedHour,
                      actualHour: issueDetail?.actualHour,
                    });
                  }}
                  className="flex-align-center changeStatusButton"
                >
                  <NotebookIcon className="icon" />
                  <Typography.Text className="text-dark-30 ml-1 font-13 ">
                    Change Status
                  </Typography.Text>
                </Button>
              </Item>
            ) : (
              <div className="selectRightBox">
                <Item label="Status" name="status">
                  <Select options={statusOptions} />
                </Item>
                <Item className="mt-2" label="Assignee" name="assigneeId">
                  <Select options={memberOptions} />
                </Item>
                <div className="flex-space-between mt-2">
                  <Item
                    className="datePickerItem"
                    label="Start Date"
                    name="startDate"
                  >
                    <DatePicker className="datePicker" />
                  </Item>
                  <Item
                    className="ml-1 datePickerItem"
                    label="Due Date"
                    name="dueDate"
                  >
                    <DatePicker className="datePicker" />
                  </Item>
                </div>
                <div className="flex-space-between mt-2">
                  <Item
                    className="datePickerItem mb-0"
                    label="Estimate"
                    name="estimatedHour"
                  >
                    <InputNumber />
                  </Item>
                  <Item
                    className="ml-1 datePickerItem mb-0"
                    label="Actual"
                    name="actualHour"
                  >
                    <InputNumber />
                  </Item>
                </div>
              </div>
            )}
          </div>
          {isUpdateIssueFormOpen && (
            <Item name="attachedFile" className="uploadFile mt-4 mb-0">
              <Upload
                beforeUpload={() => {
                  return false;
                }}
                fileList={fileList}
                onChange={e => {
                  setFileList(e.fileList);
                  !e.fileList.length &&
                    form.setFieldValue("attachedFile", undefined);
                }}
              >
                <Button className="uploadButton" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            </Item>
          )}
          {isUpdateIssueFormOpen && (
            <div className="buttonContainer flex-justify-center my-4">
              <Item>
                <Button
                  onClick={() => setIsUpdateIssueFormOpen(false)}
                  className="closeButton text-black font-weight-half-bold"
                >
                  Close
                </Button>
              </Item>
              <Item shouldUpdate>
                {() => (
                  <Button
                    disabled={
                      isInvalidForm({
                        form,
                        isSubmitting:
                          isUpdateIssueLoading || isUploadToFireBase,
                      }) || isEqual(form.getFieldsValue(), initialFormValue)
                    }
                    onClick={handleUpdateIssue}
                    className="submitButton font-weight-bold ml-3"
                  >
                    Submit
                  </Button>
                )}
              </Item>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default memo(IssueDetailScreen);
