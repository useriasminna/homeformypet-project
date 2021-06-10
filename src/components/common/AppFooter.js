import React from "react";
import styled from "styled-components";
const Footer = styled.footer`
  /* position: absolute; */
  left: 0%;
  bottom: 0%;
  top: 100%;
  width: 100%;
  height: 200px;
  padding: 20px;
  justify-items: center;
  align-items: center;

  background-image: linear-gradient(to top right, #d7bf94, #ffffff);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;
function AppFooter() {
  return <Footer></Footer>;
}

export default AppFooter;
