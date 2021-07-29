import React from "react";
import styled from "styled-components";

const TextInput = (props: any) => {
  return (
    <TextInp
      onChange={props.onChange}
      placeholder={props.placeholder}
      type="text"
    ></TextInp>
  );
};

export default TextInput;

const TextInp = styled.input`
  width: 300px;
  height: 20px;
  border: 1px solid #ddd;
  outline: none;
  border-radius: 4px;
  padding: 10px;
`;
