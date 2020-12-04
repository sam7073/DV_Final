import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import sheet from '../Assets/data/2017_data.csv';
import styled from 'styled-components';

const StyledRow = styled.div`
  width: 200px;
  height: 30px;
  background-color: cyan;
`;

export default function Data(props) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const Rows = [];
    d3.csv(sheet, function (data) {
      const see = data['발생지시도'];
      const gungoo = data['발생지시군구'];
      const lat = data['위도'];
      const lng = data['경도'];
      const bob = data['법규위반'];
      Rows.push({ see, gungoo, lat, lng, bob });
    });
  }, []);
  return <div>{console.log(rows)}</div>;
}
