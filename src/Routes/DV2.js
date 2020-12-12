import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import koreaMap from '../Assets/data/seoul_municipalities_topo_simple.json';
import './map.css';
import Button from '../components/Buttons';
import Container from '../components/Container';

import dataAll from '../Assets/data/All_data.csv';

export default function Dv1(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [Rows, setRows] = useState([]);
  const [cause, setCause] = useState('과속');
  function load_data() {
    const tuples = [];
    d3.csv(dataAll, function (data) {
      const lat = Number(data['위도']);
      const lng = Number(data['경도']);
      const law = data['법규위반'];
      tuples.push([lat, lng, law]);
    }).then(() => {
      console.log(tuples);
      const newTuples = tuples.filter((tuple) => {
        return tuple[2] === cause;
      });
      setRows(newTuples);
      setIsLoaded(true);
    });
    return tuples;
  }
  useEffect(() => {
    load_data();
  }, [cause]);
  useEffect(() => {
    if (isLoaded) {
      d3.select('svg').remove();
      const projection = d3.geoMercator().scale(1).translate([0, 0]);
      const path = d3.geoPath().projection(projection);
      const geojson = topojson.feature(
        koreaMap,
        koreaMap.objects.seoul_municipalities_geo
      );
      const width = 500;
      const height = 500;
      const svg = d3
        .select('.d3')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'map');
      const feature = svg.append('g');
      const circles = svg.append('g');
      const labels = svg.append('g');
      const bounds = path.bounds(geojson);
      const widthScale = (bounds[1][0] - bounds[0][0]) / width;
      const heightScale = (bounds[1][1] - bounds[0][1]) / height;
      const scale = 1 / Math.max(widthScale, heightScale);
      const xoffset = width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2;
      const yoffset = height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2;
      const offset = [xoffset, yoffset];
      let centered;
      projection.scale(scale).translate(offset);

      labels
        .attr('class', 'label')
        .selectAll('.labels')
        .data(geojson.features)
        .enter()
        .append('text')
        .attr('transform', function (d) {
          return 'translate(' + path.centroid(d) + ')';
        })
        .text((d) => {
          return d.properties.SIG_KOR_NM;
        })
        .style('text-anchor', 'middle');
      circles
        .attr('class', 'circle')
        .selectAll('.circles')
        .data(Rows)
        .enter()
        .append('circle')
        .attr('cx', function (d) {
          return projection([d[1], d[0]])[0];
        })
        .attr('cy', function (d) {
          return projection([d[1], d[0]])[1];
        })
        .attr('r', 2)
        .attr('fill', '#B00000')
        .attr('opacity', 0.8);
      feature
        .selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('class', function (d) {
          return d.properties.SIG_KOR_NM;
        })
        .attr('d', path)
        .on('click', function (e, d) {
          click(d);
        });
      function click(d) {
        let x, y, k;
        if (d && centered !== d) {
          var centroid = path.centroid(d);
          k = 2;
          x = centroid[0] - width / 4;
          y = centroid[1] - height / 4;
          centered = d;
        } else {
          x = 0;
          y = 0;
          k = 1;
          centered = null;
        }
        feature.selectAll('path').classed(
          'active',
          centered &&
            function (d) {
              return d === centered;
            }
        );
        feature
          .transition()
          .duration(750)
          .attr(
            'transform',
            'scale(' + k + ')translate(' + -x + ',' + -y + ')'
          );
        circles
          .transition()
          .duration(750)
          .attr(
            'transform',
            'scale(' + k + ')translate(' + -x + ',' + -y + ')'
          );
        labels
          .transition()
          .duration(750)
          .attr(
            'transform',
            'scale(' + k + ')translate(' + -x + ',' + -y + ')'
          );
      }
    }
  }, [isLoaded]);
  return (
    <Container>
      <Container fd="column">
        <Container>
          <Button
            className="year"
            secondary
            onClick={() => {
              if (cause !== '과속') {
                setIsLoaded(false);
                setRows([]);
                setCause('과속');
              }
            }}
          >
            과속
          </Button>
          <Button
            className="year"
            secondary
            fs="14px"
            onClick={() => {
              if (cause !== '안전운전 의무 불이행') {
                setIsLoaded(false);
                setRows([]);
                setCause('안전운전 의무 불이행');
              }
            }}
          >
            안전운전 의무 불이행
          </Button>
          <Button
            className="year"
            secondary
            onClick={() => {
              if (cause !== '신호위반') {
                setIsLoaded(false);
                setRows([]);
                setCause('신호위반');
              }
            }}
          >
            신호위반
          </Button>
          <Button
            className="year"
            secondary
            onClick={() => {
              if (cause !== '중앙선침범') {
                setIsLoaded(false);
                setRows([]);
                setCause('중앙선 침범');
              }
            }}
          >
            중앙선침범
          </Button>
        </Container>
        <h3>원인별 사망 교통사고 분류 ({cause})</h3>
        <div className="d3"></div>
      </Container>

      {/* <div>선택된 구: {goo}</div>
      <div style={{ marginTop: '20px' }}>사망 교통사고 수: {casulty}</div>
      <div style={{ marginTop: '20px' }}>사망자 수 : {casulty}</div> */}
    </Container>
  );
}
