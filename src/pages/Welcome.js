import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sitter from "../assets/sitter.jpg";
import owner from "../assets/owner.jpg";
import SectionBreak from "../components/common/SectionBreak";
import { useHistory } from "react-router";
import { auth } from "../utils/firebase";

const WelcomeBody = styled.body`
  background-color: #fffaf0;
  align-content: center;
  justify-content: center;
  overflow: auto;
  position: relative;
`;
const WelcomeContainer = styled.div`
  position: absolute;
  margin: 40px 0 40px 0;
  padding: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: auto;
  background-color: white;
  border: 1px solid floralwhite;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;
const WelcomeText = styled.div`
  margin-left: 45px;
  margin-bottom: 60px;
  font-style: italic;
  font-size: 16px;
`;
const OptionsContainer = styled.div`
  width: 90%;
  height: 253px;
  display: flex;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: space-between;
`;
const Option = styled.div`
  position: relative;
  width: 45%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  border: 1px solid lightgray;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  img {
    max-width: 100%;
    height: 100%;
    display: inline-table;
    object-fit: contain;
  }
`;
const OptionLayer = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 15px;
  transition: all 0.4s ease-in-out 0s;

  :hover {
    opacity: 1;
    cursor: pointer;
  }
  :active {
    opacity: 1;
  }
`;
const OptionText = styled.div`
  text-align: center;
  font-size: 18px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Welcome() {
  const [authentication, setAuthentication] = useState({
    loggedIn: false,
    loading: true,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthentication({
          loggedIn: true,
          loading: false,
        });
      } else {
        setAuthentication({
          loggedIn: false,
          loading: false,
        });
      }
    });
  }, [setAuthentication]);

  const history = useHistory();
  const navigateToPage = (e, linkTo) => {
    e.preventDefault();
    history.push(linkTo);
  };

  return authentication.loggedIn ? (
    <WelcomeBody>
      <WelcomeContainer>
        <WelcomeText>
          <h1>Thank you for your registration!</h1>
          <strong>
            Please choose one of the options bellow and tell us how would you
            like to continue.
          </strong>
        </WelcomeText>
        <SectionBreak />

        <OptionsContainer>
          <Option>
            <img src={owner} alt="pet sitter option" />

            <OptionLayer
              className="hover-layer-top"
              onClick={(e) => navigateToPage(e, "/ownerform")}
            >
              <OptionText>PET OWNER</OptionText>
            </OptionLayer>
          </Option>
          <Option>
            <img src={sitter} alt="pet sitter option" />
            <OptionLayer
              className="hover-layer-top"
              onClick={(e) => navigateToPage(e, "/sitterform")}
            >
              <OptionText>PET SITTER</OptionText>
            </OptionLayer>
          </Option>
        </OptionsContainer>
        <SectionBreak />
      </WelcomeContainer>
    </WelcomeBody>
  ) : null;
}

export default Welcome;
