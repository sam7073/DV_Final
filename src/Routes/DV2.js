import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import koreaMap from "../Assets/data/seoul_municipalities_topo_simple.json";
import "./map.css";

export default function Dv1(props) {
  useEffect(() => {
    const geojson = topojson.feature(
      koreaMap,
      koreaMap.objects.seoul_municipalities_geo
    );
    const width = 500;
    const height = 500;
    const svg = d3
      .select(".d3")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "map");
    const map = svg.append("g");
    const labels = svg.append("g");

    let projection = d3.geoMercator().scale(1).translate([0, 0]);
    const path = d3.geoPath().projection(projection);
    const bounds = path.bounds(geojson);

    const widthScale = (bounds[1][0] - bounds[0][0]) / width;
    const heightScale = (bounds[1][1] - bounds[0][1]) / height;
    const scale = 1 / Math.max(widthScale, heightScale);
    const xoffset = width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2;
    const yoffset = height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2;
    const offset = [xoffset, yoffset];
    projection.scale(scale).translate(offset);
    map
      .selectAll("path")
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
  }, []);

  return <div className="d3"></div>;
}
