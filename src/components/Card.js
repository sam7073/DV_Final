import React from "react";
import styled from "styled-components";

const StyledCard = styled.span`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  border-radius: 5px;
  border: none;
  background-color: white;

  box-shadow: 0px 0px 100px 5px #323a40;

  display: flex;
  flex-direction: ${(props) => props.fd || "row"};
  align-items: center;
  justify-content: center;

  font-size: ${(props) => props.fontSize || "20px"};

  margin-left: ${(props) => props.margin_left};
`;

export function Card({ width, height, children, margin_left, fd }) {
  return (
    <StyledCard width={width} height={height} margin_left={margin_left} fd={fd}>
      {children}
    </StyledCard>
  );
}

export default Card;
