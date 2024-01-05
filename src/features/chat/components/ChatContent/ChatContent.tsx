import { memo } from "react";

import { MessageOutlined } from "@ant-design/icons";
import { Timestamp } from "@firebase/firestore";
import { Input, Typography } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import useGetUser from "@/features/dashboard/hooks/useGetUser";
import useCreateDocument from "@/hooks/useCreateDocument";
import { isInvalidForm } from "@/utils/utils";

import styles from "./ChatContent.module.scss";

interface ChatContentInterface {
  contactConversation: any[];
}

const ChatContent = ({ contactConversation }: ChatContentInterface) => {
  const { projectId } = useParams();

  const [form] = useForm();
  const { createDocument } = useCreateDocument("chat");

  const { user } = useGetUser(String(localStorage.getItem(USER_ID)));

  const handleSendMessage = () => {
    createDocument({
      createdAt: Timestamp.fromDate(new Date()),
      content: form.getFieldValue("content"),
      projectId: Number(projectId),
      recipient: contactConversation[0],
      sender: {
        id: Number(localStorage.getItem(USER_ID)),
        username: user?.username,
        avatarUrl: user?.avatarUrl,
      },
    }).then(() => {
      form?.resetFields();
      openNotification({ type: "success", message: "Send success" });
    });
  };

  return (
    <div className={styles.container}>
      {contactConversation ? (
        <>
          <div className="flex-align-center chatHeader">
            {contactConversation?.[0].avatarUrl ? (
              <img
                src={contactConversation?.[0].avatarUrl}
                alt="avatar"
                className="avatar"
              />
            ) : (
              <div className="avatar flex-center">
                {contactConversation?.[0].username.charAt(0).toUpperCase()}
              </div>
            )}
            <Typography className="font-weight-bold ml-1">
              {contactConversation?.[0].username}
            </Typography>
          </div>
          <div className="chatContent">
            {contactConversation?.[1].map((conversation: any) => (
              <>
                {conversation.sender.id ===
                Number(localStorage.getItem(USER_ID)) ? (
                  <div className="currentUserMessage message mb-3">
                    <Typography className="text-white">
                      {conversation.content}
                    </Typography>
                    <Typography className="text-white-10 timeline">
                      {dayjs(conversation.createdAt.toDate()).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </Typography>
                  </div>
                ) : (
                  <div className="contactUserMessage message mb-3">
                    <Typography>{conversation.content}</Typography>
                    <Typography className="text-dark-10">
                      {dayjs(conversation.createdAt.toDate()).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </Typography>
                  </div>
                )}
              </>
            ))}
          </div>
          <Form form={form} className="formInput flex-align-center">
            <Item name="content" className="chatInput mb-0">
              <Input
                onPressEnter={handleSendMessage}
                placeholder="Type your message here..."
              />
            </Item>
            <Item shouldUpdate className="mb-0">
              {() => (
                <Button
                  onClick={handleSendMessage}
                  disabled={isInvalidForm({ form, fieldsRequire: ["content"] })}
                  className="sendButton ml-2"
                >
                  <MessageOutlined className="sendIcon" />
                </Button>
              )}
            </Item>
          </Form>
        </>
      ) : (
        <Typography className="ml-2">
          There are no conversation right now.
        </Typography>
      )}
    </div>
  );
};

export default memo(ChatContent);
