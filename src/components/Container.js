import React from "react";
import styled from "styled-components";

const StyledContainer = styled.span`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  display: flex;
  flex-direction: ${(props) => props.fd || "row"};
  align-items: center;
  justify-content: ${(props) => props.jc};

  font-size: ${(props) => props.fontSize || "20px"};

  overflow: auto;

  position: relative;
`;

export function Container({ width, height, children, fd, jc }) {
  return (
    <StyledContainer width={width} height={height} fd={fd} jc={jc}>
      {children}
    </StyledContainer>
  );
}

export default StyledContainer;
