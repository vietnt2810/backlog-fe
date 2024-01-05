import { memo, useMemo, useState } from "react";

import { useParams } from "react-router-dom";

import { USER_ID } from "@/constants/constants";
import useFirestoreRealtime from "@/hooks/useFirestoreRealtime";

import styles from "./ChatScreen.module.scss";
import ChatContent from "../../components/ChatContent/ChatContent";
import ChatSideBar from "../../components/ChatSideBar/ChatSideBar";

const ChatsScreen = () => {
  const currentUserId = Number(localStorage.getItem(USER_ID));
  const { projectId } = useParams();
  const { data: chatsData } = useFirestoreRealtime("chat", Number(projectId));

  const [chosenContact, setChosenContact] = useState(0);

  const conversations = useMemo(() => {
    const result: any = [];

    const userChats = chatsData.filter(
      chat =>
        chat.sender.id === currentUserId || chat.recipient.id === currentUserId
    );

    userChats.forEach(chat => {
      const otherUserId =
        chat.sender.id === currentUserId ? chat.recipient.id : chat.sender.id;

      const otherUserInformation =
        chat.sender.id === otherUserId ? chat.sender : chat.recipient;

      const otherUserIndexInResult = result.findIndex(
        (user: any) => user[0].id === otherUserId
      );

      if (otherUserIndexInResult !== -1) {
        result[otherUserIndexInResult][1].push(chat);
      } else {
        result.push([otherUserInformation, [chat]]);
      }
    });

    return result.reverse();
  }, [chatsData, currentUserId]);

  return (
    <div className={styles.container}>
      <ChatSideBar
        conversations={conversations}
        setChosenContact={setChosenContact}
        chosenContact={chosenContact}
      />
      <ChatContent contactConversation={conversations[chosenContact]} />
    </div>
  );
};

export default memo(ChatsScreen);
