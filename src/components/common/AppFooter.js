import React from "react";
// import { useHistory } from "react-router";
import styled from "styled-components";
import firebaseLogo from "../../assets/firebaseLogo.png";
import reactLogo from "../../assets/reactLogo.png";
import jsLogo from "../../assets/jsLogo.png";

const Footer = styled.div`
  width: 100%;
  height: 100px;
  padding: 5px;
  text-align: center;
  background-image: linear-gradient(#ffffff, #f5e4d1);
  strong {
    color: #874c00;
  }
`;
const Tech = styled.div`
  position: absolute;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  img {
    width: 40px;
    height: auto;
  }
`;
function AppFooter() {
  // const history = useHistory();
  // const navigateToPage = (e, linkTo) => {
  //   e.preventDefault();
  //   history.push(linkTo);
  // };
  return (
    <Footer>
      <strong>Technologies </strong>
      <Tech>
        {" "}
        <img src={firebaseLogo} title="firebase logo" alt="firebase logo" />
        <img src={reactLogo} title=" react logo" alt="react logo" />
        <img src={jsLogo} title="javascript logo" alt="javascript logo" />
      </Tech>
    </Footer>
  );
}

export default AppFooter;
