import {
  MapContainer,
  TileLayer,
  Polyline,
  GeoJSON,
  useMapEvents,
  Popup,
} from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-polylineoffset";
import { scale } from "chroma-js";
import { useState, useMemo } from "react";
import Legend from "./Legend";
import useRailRoutes from "./useRailRoutes";

//Child component that listens for changes in zoom and sets state
const SetDataonZoom = (props) => {
  const map = useMapEvents({
    zoom() {
      props.setZoom(map.getZoom());
    },
  });
  return null;
};

const Map = ({ variable, data }) => {
  const [zoomLevel, setZoomLevel] = useState(13);

  const mapCenter = [42.3601, -71.0589];

  //custom hook for getting data from the TransitLand API for the chosen mode
  const subway = useRailRoutes(1);
  const rail = useRailRoutes(2);

  //Create color scale
  const colors = scale(["#FFB35C", "#1F91AD"]).colors(6);
  const colorScale = scale(colors).domain([1, 6]);

  //create a polyline for each segment of the data
  const computePolylines = (featureSet) => {
    const lines = featureSet.map(({ geometry, properties }) => {
      //reverse coords for polyline
      const coordList = geometry.coordinates.map((pair) => {
        return [pair[1], pair[0]];
      });

      const IB = properties.dir_id === "Inbound";
      const freq = properties[variable];

      const options = {
        weight: 3,
        color: IB ? colorScale(freq) : colorScale(freq),
        offset: IB ? 5 : 0,
        dashArray: IB ? "10, 5" : "",
      };

      return (
        <Polyline
          className={classes.busline}
          key={Math.random()}
          positions={coordList}
          pathOptions={options}
          eventHandlers={{
            mouseover: (e) => e.target.setStyle({ weight: 8 }),
            mouseout: (e) => e.target.setStyle({ weight: 3 }),
          }}
        >
          <Popup>
            <strong>Direction:</strong> {properties.dir_id}
            <br />
            <strong>Routes:</strong> {properties.route_name}
            <br />
            <strong>All-Day Volume:</strong> {properties.frequency}
            <br />
            <strong>Max Frequency:</strong> {properties.max_freq}
            <br />
            <strong>Score</strong> {properties.total_score}
          </Popup>
        </Polyline>
      );
    });

    return lines;
  };

  //only recompute lines if the data has changed
  const lines = useMemo(() => computePolylines(data), [data]);

  //styling configuration for map elements
  function styleLines(feature) {
    return {
      color: colorScale(feature.properties[variable]),
    };
  }

  function styleRail(feature) {
    return {
      weight: 1,
      color: "#D6AEC0",
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
          <GeoJSON key={Math.random()} style={styleLines} data={data} />
        )}
        {subway && (
          <GeoJSON key={Math.random()} style={styleRail} data={subway} />
        )}
        {rail && <GeoJSON key={Math.random()} style={styleRail} data={rail} />}
        <SetDataonZoom setZoom={setZoomLevel} />
      </MapContainer>
      <Legend colors={colors} />
    </div>
  );
};

export default Map;
