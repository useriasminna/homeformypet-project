import React from "react";
import styled from "styled-components";

const Break = styled.hr`
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, transparent, #ccc, transparent);
  margin: 40px 0px;
`;
function SectionBreak() {
  return <Break></Break>;
}

export default SectionBreak;
