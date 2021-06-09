import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "utils/firebase";
import UploadModal from "components/PostUploadModal";
import AppHeader from "./AppHeader";
import NavbarMenu from "components/NavbarMenu";
import AppFooter from "./AppFooter";

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
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);

      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snpashot) => {
          if (snpashot.exists) {
            setUsername(snpashot.data().userName);
            setUserPhoto(snpashot.data().profilePicture);
          }
        });
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AppContainer>
      <AppHeader
        username={username}
        userPhoto={userPhoto}
        setIsOpenedModal={setIsOpenedModal}
        NavbarMenu={NavbarMenu}
      ></AppHeader>
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
