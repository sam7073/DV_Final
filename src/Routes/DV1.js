import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import koreaMap from "../Assets/data/seoul_municipalities_topo_simple.json";
import "./map.css";

import data2017 from "../Assets/data/2017_data.csv";
import data2018 from "../Assets/data/2018_data.csv";
import data2019 from "../Assets/data/2019_data.csv";

const geojson = topojson.feature(
  koreaMap,
  koreaMap.objects.seoul_municipalities_geo
);
const width = 500;
const height = 500;

const svg = d3
  .select(".d31")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "map");
const feature = svg.append("g");
const labels = svg.append("g");
const circles = svg.append("g");
const projection = d3.geoMercator().scale(1).translate([0, 0]);
const path = d3.geoPath().projection(projection);
const bounds = path.bounds(geojson);
const widthScale = (bounds[1][0] - bounds[0][0]) / width;
const heightScale = (bounds[1][1] - bounds[0][1]) / height;
const scale = 1 / Math.max(widthScale, heightScale);
const xoffset = width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2;
const yoffset = height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2;
const offset = [xoffset, yoffset];
projection.scale(scale).translate(offset);

export default function Dv1(props) {
  const [Rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  async function load_data() {
    const tuples = [];
    await d3.csv(data2017, function (data) {
      const lat = Number(data["위도"]);
      const lng = Number(data["경도"]);
      tuples.push([lat, lng]);
    });
    setRows(tuples);
    setIsLoaded(true);
    console.log("data loading done");
  }
  useEffect(() => {
    load_data();
  }, []);

  useEffect(() => {
    feature
      .selectAll("path")
      .attr("class", "feature")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path);
    labels
      .attr("class", "label")
      .selectAll(".labels")
      .data(geojson.features)
      .enter()
      .append("text")
      .attr("transform", function (d) {
        return "translate(" + path.centroid(d) + ")";
      })
      .text((d) => {
        return d.properties.SIG_KOR_NM;
      })
      .style("text-anchor", "middle");
    circles
      .selectAll("circle")
      .data(Rows)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        // return path.centroid(d);
      })
      .attr("cy", function (d) {
        // return path.centroid(d);
      })
      .attr("r", "3px")
      .attr("fill", "red");
  }, []);

  return <></>;
}
