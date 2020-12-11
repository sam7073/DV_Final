import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import data2017 from '../Assets/data/2017_data.csv';
import data2018 from '../Assets/data/2018_data.csv';
import data2019 from '../Assets/data/2019_data.csv';
import styled from 'styled-components';

import Container from '../components/Container';
import Button from '../components/Buttons';

const StyledRow1 = styled.div`
  width: 540px;
  height: 35px;
  background-color: aquamarine;

  border: 1px black solid;

  font-size: 12px;

  position: relative;
`;

const StyledRow2 = styled.div`
  width: 540px;
  height: 35px;
  background-color: thistle;

  border: 1px black solid;

  font-size: 12px;

  position: relative;
`;

const StyledRow3 = styled.div`
  width: 540px;
  height: 35px;
  background-color: turquoise;

  border: 1px black solid;

  font-size: 12px;

  position: relative;
`;

export default function Data(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [Rows, setRows] = useState([]);
  const [year, setYear] = useState();
  useEffect(() => {
    if (year === 2017) {
      d3.csv(data2017, function (data, index) {
        const see = data['발생지시도'];
        const gungoo = data['발생지시군구'];
        const lat = data['위도'];
        const lng = data['경도'];
        const bob = data['법규위반'];
        Rows.push(
          <StyledRow1
            key={index}
          >{`${see} ${gungoo} latitude: ${lat} longitude: ${lng} violation: ${bob}`}</StyledRow1>
        );
      }).then(() => {
        setIsLoaded(true);
      });
    } else if (year === 2018) {
      d3.csv(data2018, function (data, index) {
        const see = data['발생지시도'];
        const gungoo = data['발생지시군구'];
        const lat = data['위도'];
        const lng = data['경도'];
        const bob = data['법규위반'];
        Rows.push(
          <StyledRow2
            key={index}
          >{`${see} ${gungoo} latitude: ${lat} longitude: ${lng} violation: ${bob}`}</StyledRow2>
        );
      }).then(() => {
        setIsLoaded(true);
      });
    } else if (year === 2019) {
      d3.csv(data2019, function (data, index) {
        const see = data['발생지시도'];
        const gungoo = data['발생지시군구'];
        const lat = data['위도'];
        const lng = data['경도'];
        const bob = data['가해자법규위반'];
        Rows.push(
          <StyledRow3
            key={index}
          >{`${see} ${gungoo} latitude: ${lat} longitude: ${lng} violation: ${bob}`}</StyledRow3>
        );
      }).then(() => {
        setIsLoaded(true);
      });
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);
  return (
    <Container fd="column">
      <Container>
        <Button
          secondary
          onClick={() => {
            if (year !== 2017) {
              setIsLoaded(false);
              setRows([]);
              setYear(2017);
            }
          }}
        >
          2017
        </Button>
        <Button
          secondary
          onClick={() => {
            if (year !== 2018) {
              setIsLoaded(false);
              setRows([]);
              setYear(0);
              setYear(2018);
            }
          }}
        >
          2018
        </Button>
        <Button
          secondary
          onClick={() => {
            if (year !== 2019) {
              setIsLoaded(false);
              setRows([]);
              setYear(0);
              setYear(2019);
            }
          }}
        >
          2019
        </Button>
      </Container>
      <Container fd="column" width="580px" height="520px">
        {isLoaded ? Rows : null}
      </Container>
    </Container>
  );
}
