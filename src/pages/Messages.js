import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormOutlined } from "@ant-design/icons";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import NewChatModal from "../components/NewChatModal";
import { auth, db } from "../utils/firebase";
import AppFooter from "../components/common/AppFooter";

const MessagesBody = styled.div`
  width: 100%;
  background-color: #fafafa;
  height: 100%;
`;
const MessagesPageContainer = styled.div`
  margin: 0 auto;
  height: 560px;
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: white;

  width: 70%;
  flex: 1;
  border: 1px solid lightgray;
  display: flex;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  > * {
    flex: 1;
  }
`;

const ListContainer = styled.div`
  max-width: 350px;
  border-right: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  @media (max-width: 735px) {
    display: none;
  }
`;

const ListHeader = styled.div`
  height: 60px;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid lightgray;
`;

const ChatListContainer = styled.div`
  overflow-x: hidden;
  flex-grow: 1;
  height: 0;
`;

const UsernameHeader = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const FormIcon = styled(FormOutlined)`
  font-size: 25px;
  color: #fff;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
`;

function Messages() {
  const [username, setUsername] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [openedChat, setOpenedChat] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists)
          setUsername(
            snapshot.data().firstName + " " + snapshot.data().lastName
          );
      });
  }, []);

  return (
    <MessagesBody>
      <MessagesPageContainer>
        <ListContainer>
          <ListHeader>
            <UsernameHeader>{username}</UsernameHeader>
            <FormIcon onClick={() => setIsModalOpened(true)} />
          </ListHeader>
          <ChatListContainer>
            <ChatList openedChat={openedChat} setOpenedChat={setOpenedChat} />
          </ChatListContainer>
        </ListContainer>
        <Chat
          chatid={openedChat}
          openNewChatModal={() => setIsModalOpened(true)}
        />
        <NewChatModal
          isOpened={isModalOpened}
          setIsOpened={setIsModalOpened}
          setOpenedChat={setOpenedChat}
        />
      </MessagesPageContainer>
      <AppFooter />
    </MessagesBody>
  );
}

export default Messages;
