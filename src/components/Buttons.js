import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => (props.long ? "240px" : "120px") || props.width};
  height: ${(props) => (props.thick ? "50px" : "35px") || props.height};

  border-radius: 5px;
  border: none;

  margin-top: ${(props) => props.marginTop || "10px"};
  margin-bottom: ${(props) => props.marginBottom || "10px"};
  margin-left: ${(props) => props.marginLeft || "10px"};
  margin-right: ${(props) => props.marginRight || "10px"};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};

  font-family: Maplestory;
  font-weight: bold;
  font-size: 20px;

  color: ${(props) =>
    (props.primary && "white") || (props.secondary && "black") || props.color};
  background-color: ${(props) =>
    (props.primary && "#960820") || (props.secondary && "#c8bdad") || props.bg};

  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #960820;
    color: white;
  }
`;

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
