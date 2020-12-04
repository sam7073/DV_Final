import React from 'react';
import * as d3 from 'd3';
import sheet from '../Assets/data/2017_data.csv';

export default function Data(props) {
  d3.csv(sheet, function (data) {
    console.log(data);
  });
  return <>Data</>;
}
