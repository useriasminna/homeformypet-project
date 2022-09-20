import React from "react";
import styled from "styled-components";
import AppLogo from "../../assets/logo.png";
import { Avatar } from "antd";
import { auth } from "../../utils/firebase";
import { useHistory } from "react-router";
import {
  HomeOutlined,
  MessageOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const Header = styled.div`
  height: 60px;
  width: 100%;
  position: sticky;
  z-index: 10;
  top: 0;
  padding: 15px 20px;
  border-bottom: transparent;
  background-color: #d7bf94;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-image: linear-gradient(to top right, #d7bf94, #ffffff);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  a.logo-link {
    height: 20px;
    display: flex;
    align-items: center;
    padding-top: 7px;
    margin-right: 15px;
    @media (max-width: 735px) {
      display: none;
    }
  }
`;
const LogoContainer = styled.div`
  img {
    height: 47px;
    max-width: 100%;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const NavbarMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 175px;
  font-size: 20px;
  color: #794c36;
  > * + * {
    margin-left: 20px;
  }
  a,
  a:hover {
    color: inherit;
  }
  .profile-link {
    display: flex;
  }
  @media (max-width: 735px) {
    justify-content: space-between;
    width: 100%;
  }
`;
const MyAvatar = styled(Avatar)`
  background-color: darkgreen;
  color: white;
  span {
    font-size: 14px;
  }
  img {
    object-fit: cover;
  }
`;
const LogOutButton = styled.button`
  font-size: 12px;
  text-align: center;
  border: none;
  width: 70px;
  background-color: #3f913f;
  border-radius: 5px;
  padding: 3px;
  margin-right: 120px;
  color: white;
  opacity: 1;
  transition: 0.3s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
  @media (max-width: 735px) {
    justify-content: space-between;
    width: 100%;
  }
`;

function NavAppHeader(
  petType,
  profilePicture,
  username,
  setIsOpenedModal,
  openUploadModal
) {
  const history = useHistory();
  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };
  return (
    <Header>
      <div className="container">
        <LogoContainer>
          <a
            className="logo-link"
            href="/home"
            onClick={(e) => navigateToPage(e, "/home")}
          >
            <img src={AppLogo} alt="instagram logo" />
          </a>
        </LogoContainer>
        {petType.petType === "" ? (
          <LogOutButton
            key="logout"
            onClick={(e) => {
              auth.signOut();
              navigateToPage(e, "/login");
            }}
          >
            Log Out
          </LogOutButton>
        ) : (
          <NavbarMenu>
            <a
              title="home"
              href="/home"
              onClick={(e) => navigateToPage(e, "/home")}
            >
              <HomeOutlined />
            </a>
            <a
              title="chat"
              href="/direct"
              onClick={(e) => navigateToPage(e, "/direct")}
            >
              <MessageOutlined />
            </a>
            <ExportOutlined
              title="logout"
              key="logout"
              onClick={(e) => {
                auth.signOut();
                navigateToPage(e, "/login");
              }}
            />
            <a
              title="profile"
              className="profile-link"
              href={`/profile/${auth.currentUser.uid}`}
              onClick={(e) =>
                navigateToPage(e, "/profile/" + auth.currentUser.uid)
              }
            >
              <MyAvatar size={22} src={petType.profilePicture} alt="Profile">
                {petType.username?.[0]?.toUpperCase()}
              </MyAvatar>
            </a>
          </NavbarMenu>
        )}
      </div>
    </Header>
  );
}

export default NavAppHeader;
