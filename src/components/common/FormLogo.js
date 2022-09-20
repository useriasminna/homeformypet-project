import React from "react";
import styled from "styled-components";
import AppLogo from "../../assets/logo.png";

const FormLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 70px;
    object-fit: contain;
  }
`;

function FormLogo() {
  return (
    <FormLogoContainer>
      <img src={AppLogo} alt=" logo" />
    </FormLogoContainer>
  );
}

export default FormLogo;
