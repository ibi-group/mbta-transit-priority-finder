import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-polylineoffset";
import { scale } from "chroma-js";
import Legend from "./Legend";
import useRailRoutes from "./useRailRoutes";
import SegmentsOverlay from "./SegmentsOverlay";
import StopsOverlay from "./StopsOverlay";
import { useState } from "react";

//Polyline offset circles issue doc: https://stackoverflow.com/questions/53708398/leaflet-polyline-precision-loss-on-zoom-out

const Map = ({ variable, data }) => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const showBothSides = zoomLevel >= 16 ? true : false;
  const showStops = zoomLevel >= 14 ? true : false;
  const mapCenter = [42.3601, -71.0589];

  //Create color scale
  const colors = scale(["#FFB35C", "#1F91AD"]).colors(6);
  const colorScale = scale(colors).domain([1, 6]);

  //custom hook for getting data from the TransitLand API for the chosen mode
  const subway = useRailRoutes(1);
  const rail = useRailRoutes(2);

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
        <SegmentsOverlay
          variable={variable}
          data={data}
          scale={colorScale}
          showBothSides={showBothSides}
          setZoomLevel={setZoomLevel}
        />
        {subway && (
          <GeoJSON key={Math.random()} style={styleRail} data={subway} />
        )}
        {rail && <GeoJSON key={Math.random()} style={styleRail} data={rail} />}
        {showStops && <StopsOverlay />}
      </MapContainer>
      <Legend colors={colors} />
    </div>
  );
};

export default Map;
