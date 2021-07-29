import React from "react";
import styled from "styled-components";

const Card = (props: any) => {
  return <Box>{props.children}</Box>;
};

export default Card;

const Box = styled.div`
  width: 400px;
  box-shadow: 0 0 10px #ddd;
  border-radius: 4px;
  padding: 10px;
`;
