import {
  MapContainer,
  TileLayer,
  Polyline,
  GeoJSON,
  useMapEvents,
} from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-polylineoffset";
import { scale, limits } from "chroma-js";
import { useState, useMemo } from "react";
import Legend from "./Legend";

const SetDataonZoom = (props) => {
  const map = useMapEvents({
    zoom() {
      props.setZoom(map.getZoom());
    },
  });
  return null;
};

const Map = (props) => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const mapCenter = [42.3601, -71.0589];

  const variable = props.variable;

  const values = props.data.features.map((f) => f.properties[variable]);

  //Create color scale
  const colors = scale(["#FFB35C", "#1F91AD"]).colors(10);
  const breaks = limits(values, "q", 10);
  const colorScale = scale(colors).domain(breaks);

  const computePolylines = (featureSet) => {
    const lines = featureSet.map((feat) => {
      //reverse coords for polyline
      const coordList = feat.geometry.coordinates.map((pair) => {
        return [pair[1], pair[0]];
      });

      const IB = feat.properties.dir_id === "Inbound";
      const freq = feat.properties[variable];

      const options = {
        color: IB ? colorScale(freq) : colorScale(freq),
        offset: IB ? 5 : 0,
        dashArray: IB ? "10, 5" : "",
      };

      return (
        <Polyline
          key={Math.random()}
          positions={coordList}
          pathOptions={options}
        />
      );
    });
    return lines;
  };

  const lines = useMemo(
    () => computePolylines(props.data.features),
    [props.data.features]
  );

  function styleLines(feature) {
    return {
      color: colorScale(feature.properties[variable]),
    };
  }

  return (
    <div className={classes.map}>
      <MapContainer center={mapCenter} zoom={13} minZoom={10} maxZoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWJpLXRyYW5zaXQtZGF0YS10ZWFtIiwiYSI6ImNrcDI4aHFzMzFpMmcydnF3OHd5N3Z0OW8ifQ.IwReYu0rGZko64sy2mbPSg"
        />
        {zoomLevel >= 14 ? (
          lines
        ) : (
          <GeoJSON style={styleLines} data={props.data.features} />
        )}
        <SetDataonZoom setZoom={setZoomLevel} />
      </MapContainer>
      <Legend colors={colors} breaks={breaks} />
    </div>
  );
};

export default Map;
