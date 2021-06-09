import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 500px;
  border: 1px solid #ffefdf;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  margin-top: 10px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
function FormFooterContainer({ children }) {
  return <Container>{children}</Container>;
}

export default FormFooterContainer;
