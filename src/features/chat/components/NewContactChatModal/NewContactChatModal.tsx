import { memo, useMemo, useState } from "react";

import { Modal, ModalProps, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import cx from "classnames";
import { Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import useGetProjectMembers from "@/features/project/hooks/useGetProjectMembers";
import useCreateDocument from "@/hooks/useCreateDocument";
import { isInvalidForm } from "@/utils/utils";

import styles from "./NewContactChatModal.module.scss";

interface NewContactChatModalProps extends ModalProps {
  onCancel: () => void;
}

const NewContactChatModal = ({
  onCancel,
  ...props
}: NewContactChatModalProps) => {
  const [form] = useForm();
  const { createDocument } = useCreateDocument("chat");

  const { projectId } = useParams();
  const { projectMembers } = useGetProjectMembers(String(projectId));

  const [contactUserId, setContactUserId] = useState();
  const contactUser = useMemo(() => {
    return projectMembers?.data.find(user => user.userId === contactUserId);
  }, [contactUserId, projectMembers?.data]);
  const currentUser = projectMembers?.data.find(
    user => user.userId === Number(localStorage.getItem(USER_ID))
  );

  const contactOptions = useMemo(() => {
    return projectMembers?.data
      .filter(member => member.userId !== Number(localStorage.getItem(USER_ID)))
      .map(member => {
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
                <div className={cx(styles.memberAvatarOption, "flex-center")}>
                  {member?.username.charAt(0).toUpperCase()}
                </div>
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
  }, [projectMembers?.data]);

  const handleSendMessage = () => {
    createDocument({
      createdAt: Timestamp.fromDate(new Date()),
      content: form.getFieldValue("content"),
      projectId: Number(projectId),
      recipient: {
        id: contactUser?.userId,
        username: contactUser?.username,
        avatarUrl: contactUser?.user.avatarUrl,
      },
      sender: {
        id: Number(localStorage.getItem(USER_ID)),
        username: currentUser?.username,
        avatarUrl: currentUser?.user.avatarUrl,
      },
    }).then(() => {
      onCancel();
      form?.resetFields();
      openNotification({ type: "success", message: "Send success" });
    });
  };

  return (
    <Modal
      className="newContactChatModal"
      onCancel={onCancel}
      destroyOnClose
      width="700px"
      closable={false}
      footer={false}
      {...props}
    >
      <Form form={form}>
        <Item label="To:" className="mb-0" name="contact">
          <Select
            allowClear
            options={contactOptions}
            onChange={memberId => setContactUserId(memberId)}
          />
        </Item>
        <Item label="Message" name="content" className="mb-0 mt-4">
          <TextArea
            onPressEnter={handleSendMessage}
            placeholder="Type your message here..."
          />
        </Item>
        <Item shouldUpdate className="mb-0 mt-2 text-center">
          {() => (
            <Button
              onClick={handleSendMessage}
              disabled={isInvalidForm({
                form,
                fieldsRequire: ["contact", "content"],
              })}
              className={styles.sendButton}
            >
              Send
            </Button>
          )}
        </Item>
      </Form>
    </Modal>
  );
};

export default memo(NewContactChatModal);
