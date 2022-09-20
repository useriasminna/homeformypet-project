import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "../../utils/firebase";
import UploadModal from "../../components/PostUploadModal";
import NavAppHeader from "./NavAppHeader";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function NavAppLayout({ children }) {
  const [user, setUser] = useState();
  // const[]
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [type, setType] = useState("");

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
            setProfilePicture(snapshot.data().profilePicture);
            setType(snapshot.data().type);
          }
        });
    });
    return () => unsubscribe();
  }, [user]);
  // console.log(profilePicture,type, username)
  return (
    <AppContainer>
      <NavAppHeader
        petType={type}
        username={username}
        setIsOpenedModal={setIsOpenedModal}
        profilePicture={profilePicture}
      ></NavAppHeader>
      {children}
      <UploadModal
        isOpened={isOpenedModal}
        setIsOpen={setIsOpenedModal}
        userid={user?.uid}
      />
    </AppContainer>
  );
}

export default NavAppLayout;
