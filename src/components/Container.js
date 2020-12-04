import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.span`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  display: flex;
  flex-direction: ${(props) => props.fd || 'row'};
  align-items: center;
  justify-content: center;

  font-size: ${(props) => props.fontSize || '20px'};
`;

export function Container({ width, height, children, margin_left, fd }) {
  return (
    <StyledContainer width={width} height={height} fd={fd}>
      {children}
    </StyledContainer>
  );
}

export default StyledContainer;
