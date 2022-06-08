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
import { scale } from "chroma-js";
import { useState, useMemo } from "react";

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

  const colorScale = scale(["#C9F7F5", "#0B4744"]).domain([1, 500]).gamma(0.5);

  const computePolylines = (featureSet) => {
    const lines = featureSet.map((feat) => {
      //reverse coords for polyline
      const coordList = feat.geometry.coordinates.map((pair) => {
        return [pair[1], pair[0]];
      });

      const IB = feat.properties.dir_id === "Inbound";
      const freq = feat.properties.frequency;

      const options = {
        color: IB ? colorScale(freq) : colorScale(freq),
        offset: IB ? 10 : 0,
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
      color: colorScale(feature.properties.frequency),
    };
  }

  return (
    <div className={classes.map}>
      <MapContainer center={mapCenter} zoom={13} minZoom={10} maxZoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWJpLXRyYW5zaXQtZGF0YS10ZWFtIiwiYSI6ImNrcDI4aHFzMzFpMmcydnF3OHd5N3Z0OW8ifQ.IwReYu0rGZko64sy2mbPSg"
        />
        {zoomLevel >= 16 ? (
          lines
        ) : (
          <GeoJSON style={styleLines} data={props.data.features} />
        )}
        <SetDataonZoom setZoom={setZoomLevel} />
      </MapContainer>
    </div>
  );
};

export default Map;
