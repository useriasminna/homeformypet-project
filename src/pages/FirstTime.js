import React from "react";
import styled from "styled-components";
import HomeCover from "../assets/Dogs-and-humans.jpg";
import { Button } from "antd";
import { useHistory } from "react-router";
import AppLogo from "../assets/logo.png";

const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
`;
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
    height: 90px;
    max-width: 100%;
    object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px;
  background-color: #fff;
  position: relative;
  justify-content: center;
  align-content: center;
`;
const CoverContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: inline-table;
  }
`;
const FadeCoverContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15px;
  opacity: 0.7;
  background-color: #d7bf94;
  background-image: linear-gradient(to top right, #d7bf94, #ffffff);
  z-index: 1;
`;
const AppPurposeContainer = styled.div`
  position: absolute;
  width: 60%;
  height: 40%;
  z-index: 2;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
  justify-content: center;
  align-content: center;
  margin-bottom: 100px;
`;

const AppPurposeText = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 19px;
  text-align: center;

  a:hover {
    text-decoration: underline;
  }

  h1 {
    color: #42230d;
    text-align: center;
    font-weight: bolder;
    font-style: italic;
  }

  h2 {
    color: #4c4632;
  }

  strong {
    color: #4c4632;
    font-style: italic;
    z-index: 11;
  }
`;
const SignUpButton = styled(Button)`
  width: 150px;
  height: 37px;
  background-color: #d6f2d1;
  border: 1px solid transparent;
  color: darkgreen;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 12px;
  margin-top: 20px;
  margin-bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  :hover {
    background-color: #96bb96;
    border: 1px solid #96bb96;
    color: white;
  }
`;
const LogInLabel = styled.div`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  span {
    font-weight: bold;
  }
  a:hover {
    text-decoration: underline;
  }
`;

function FirstTime() {
  const history = useHistory();
  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  return (
    <Body>
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
        </div>
      </Header>
      <Container>
        <CoverContainer>
          <img src={HomeCover} alt="animals cover" />
        </CoverContainer>
        <FadeCoverContainer />
        <AppPurposeContainer>
          <AppPurposeText>
            <h1>HomeForMyPet</h1>
            <h2>-Our mission-</h2>
            <p>
              <strong>HomeForMyPet </strong>
              <strong>
                {" "}
                is a web app especialy designed to help building a comunity of
                pet lovers who are willing to help each other. For all pet
                owners who are looking for a temporary home for their little
                friend, in a safe environment full of love, and for those who
                are willing to help by hosting a pet, sharing the love for
                animals, this is the right place to be.
                <br />
                Either you&apos;re looking for a pet sitter, or want to help
                other pet owners, please register to our website.
              </strong>
            </p>
          </AppPurposeText>
          <SignUpButton
            type="default"
            shape="round"
            onClick={(e) => navigateToPage(e, "/signup")}
          >
            Sign Up
          </SignUpButton>
          <LogInLabel>
            <span>
              Already have an account?{" "}
              <a href="/login" onClick={(e) => navigateToPage(e, "/login")}>
                <strong>Log In</strong>
              </a>
            </span>
          </LogInLabel>
        </AppPurposeContainer>
      </Container>
    </Body>
  );
}

export default FirstTime;
