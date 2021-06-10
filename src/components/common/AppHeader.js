import React from "react";
import styled from "styled-components";
import AppLogo from "assets/logo.png";
import { auth } from "utils/firebase";
import { useHistory } from "react-router";
import { ExportOutlined } from "@ant-design/icons";

const Header = styled.div`
  height: 60px;
  width: 100%;
  position: sticky;
  z-index: 10;
  top: 0;
  padding: 5px 20px;
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
    height: 55px;
    max-width: 100%;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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
  margin-right: 107px;
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

function AppHeader(userPhoto, username, setIsOpenedModal, openUploadModal) {
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
            href="/"
            onClick={(e) => navigateToPage(e, "/")}
          >
            <img src={AppLogo} alt="instagram logo" />
          </a>
        </LogoContainer>

        <LogOutButton
          key="logout"
          onClick={(e) => {
            auth.signOut();
            navigateToPage(e, "/login");
          }}
        >
          Log Out
        </LogOutButton>
      </div>
    </Header>
  );
}

export default AppHeader;
