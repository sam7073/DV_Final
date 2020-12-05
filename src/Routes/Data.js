import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import sheet from '../Assets/data/2017_data.csv';
import styled from 'styled-components';

import Container from '../components/Container';

const StyledRow = styled.div`
  width: 540px;
  height: 35px;
  background-color: cyan;

  border: 1px black solid;

  font-size: 12px;
`;

export default function Data(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [Rows, setRows] = useState([]);
  useEffect(() => {
    d3.csv(sheet, function (data, index) {
      const see = data['발생지시도'];
      const gungoo = data['발생지시군구'];
      const lat = data['위도'];
      const lng = data['경도'];
      const bob = data['법규위반'];
      Rows.push(
        <StyledRow
          key={index}
        >{`${see} ${gungoo} latitude: ${lat} longitude: ${lng} violation: ${bob}`}</StyledRow>
      );
    }).then(() => {
      setIsLoaded(true);
    });
  }, []);
  return (
    <Container fd="column" width="580px" height="580px">
      {isLoaded ? Rows : <StyledRow>123</StyledRow>}
    </Container>
  );
}
