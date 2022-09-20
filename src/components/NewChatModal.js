import React, { useState, useEffect } from "react";
import { Avatar, Modal } from "antd";
import firebase, { auth, db } from "./../utils/firebase";
import styled from "styled-components";
import { RiEmotionSadLine } from "react-icons/ri";

const UsersModal = styled(Modal)`
  .ant-modal-body {
    padding: 10px 0;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 24px;
  :hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const UserPhoto = styled(Avatar)`
  margin-right: 10px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.45;
  .username {
    font-weight: 600;
  }
  .fullname {
    opacity: 0.75;
  }
`;
const EmptyUserContainer = styled.div`
  width: 80%;
  padding: 10px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  text-align: center;
  font-style: italic;
  svg {
    font-size: 28px;
    margin: 0 auto;
  }
`;
function NewChatModal({ isOpened, setIsOpened, setOpenedChat }) {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    db.collection("follows").onSnapshot((snapshot) => {
      Promise.all(
        snapshot.docs
          .filter((doc) => doc.data().follower === auth.currentUser.uid)
          .map(async (doc) => {
            let fullName = "";
            let profilePicture = "";
            await db
              .collection("users")
              .doc(doc.data().following)
              .get()
              .then((userDoc) => {
                fullName =
                  userDoc.data().firstName + " " + userDoc.data().lastName;
                profilePicture = userDoc.data().profilePicture;
              });

            return {
              id: doc.id,
              userId: doc.data().following,
              fullName: fullName,
              profilePicture: profilePicture,
            };
          })
      ).then(setFollowing);
    });
  }, []);

  const handleCreateChat = (firstUser, secondUser) => {
    const chatExists = async () => {
      const firstCheck = db
        .collection("chats")
        .where("firstUser", "==", firstUser)
        .where("secondUser", "==", secondUser)
        .get()
        .then((doc) => {
          if (doc.empty) return false;
          return doc.docs[0].id;
        });
      const secondCheck = db
        .collection("chats")
        .where("firstUser", "==", secondUser)
        .where("secondUser", "==", firstUser)
        .get()
        .then((doc) => {
          if (doc.empty) return false;
          return doc.docs[0].id;
        });
      const [first, second] = await Promise.all([firstCheck, secondCheck]);

      if (first && !second) return first;
      if (!first && second) return second;
      if (first && second && first === second) return first;
      return false;
    };

    chatExists().then((chatid) => {
      if (!chatid) {
        db.collection("chats")
          .add({
            firstUser: firstUser,
            secondUser: secondUser,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then((doc) => setOpenedChat(doc.id));
      } else {
        setOpenedChat(chatid);
      }
    });
    setIsOpened(false);
  };

  return (
    <UsersModal
      title="New chat"
      visible={isOpened}
      onCancel={() => setIsOpened(false)}
      onOk={() => setIsOpened(false)}
    >
      {following.length !== 0 ? (
        following.map((user) => (
          <User
            key={user.id}
            {...user}
            onClick={() => handleCreateChat(auth.currentUser.uid, user.userId)}
          >
            <UserPhoto size={40} src={user.profilePicture} alt={user.fullName}>
              {user.fullName?.[0]?.toUpperCase()}
            </UserPhoto>
            <UserDetails>
              <div className="fullName">{user.fullName}</div>
            </UserDetails>
          </User>
        ))
      ) : (
        <EmptyUserContainer>
          <RiEmotionSadLine />
          <span>
            You don&#39;t have anyone in your list of favourites. Please add the
            person you want to chat with.
          </span>
        </EmptyUserContainer>
      )}
    </UsersModal>
  );
}

export default NewChatModal;
