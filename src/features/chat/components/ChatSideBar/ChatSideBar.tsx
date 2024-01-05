/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction, memo, useState } from "react";

import { Typography } from "antd";
import dayjs from "dayjs";

import styles from "./ChatSidebar.module.scss";
import NewContactChatModal from "../NewContactChatModal/NewContactChatModal";

interface ChatSideBarProps {
  chosenContact: number;
  setChosenContact: Dispatch<SetStateAction<number>>;
  conversations?: any[];
}

const ChatSideBar = ({
  chosenContact,
  setChosenContact,
  conversations,
}: ChatSideBarProps) => {
  const [isOpenNewContactChatModal, setIsOpenNewContactChatModal] =
    useState(false);

  return (
    <div className={styles.container}>
      {conversations?.map((conversation, index) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className={"conversation flex-space-between".concat(
            index === chosenContact ? " chosenContact" : ""
          )}
          onClick={() => setChosenContact(index)}
        >
          <div className="flex-align-center">
            {conversation[0].avatarUrl ? (
              <img
                src={conversation[0].avatarUrl}
                alt="avatar"
                className="avatar"
              />
            ) : (
              <div className="avatar flex-center">
                {conversation[0].username.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="ml-2 contentBox">
              <Typography className="font-weight-bold">
                {conversation[0].username}
              </Typography>
              <Typography
                className="text-dark-30 text-ellipsis"
                title={conversation[1][conversation[1].length - 1].content}
              >
                {conversation[1][conversation[1].length - 1].content}
              </Typography>
            </div>
          </div>
          <div>
            <Typography className="text-dark-40">
              {dayjs(
                conversation[1][conversation[1].length - 1].createdAt.toDate()
              ).format("DD/MM/YYYY")}
            </Typography>
            <Typography className="text-dark-40 text-right">
              {dayjs(
                conversation[1][conversation[1].length - 1].createdAt.toDate()
              ).format("HH:mm")}
            </Typography>
          </div>
        </div>
      ))}
      <div
        onClick={() => setIsOpenNewContactChatModal(true)}
        className="openNewContactChat flex-center cursor-pointer"
      >
        +
      </div>
      {isOpenNewContactChatModal && (
        <NewContactChatModal
          open
          onCancel={() => setIsOpenNewContactChatModal(false)}
        />
      )}
    </div>
  );
};

export default memo(ChatSideBar);
