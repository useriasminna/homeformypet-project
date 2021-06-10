import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import UploadModal from "components/PostUploadModal";
import NavAppHeader from "./NavAppHeader";
// import AppFooter from "./AppFooter";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// const AppContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   /* margin: 20px 100px; */
//   flex: 1;
// `;

function AppLayout({ children }) {
  const [user, setUser] = useState();
  // const[]
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      db.collection("users")
        .doc(auth.currentUser.uid)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            // setId(snapshot.data().firstName)
            setUsername(snapshot.data().firstName);
            setUserPhoto(snapshot.data().profilePicture);
          }
        });
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <AppContainer>
      <NavAppHeader
        username={username}
        setIsOpenedModal={setIsOpenedModal}
        userPhoto={userPhoto}
      ></NavAppHeader>
      {/* <AppContent className="container">{children}</AppContent> */}
      {children}
      <UploadModal
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
        userid={user?.uid}
      />
      {/* <AppFooter /> */}
    </AppContainer>
  );
}

export default AppLayout;
