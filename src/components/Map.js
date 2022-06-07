import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";

const Map = (props) => {
  const mapCenter = [42.3601, -71.0589];

  //style segments
  function styleSegments(feature) {
    return {
      stroke: true,
      opacity: 0.5,
      color:
        feature.properties.dir_id === "Inbound" ? "darkorange" : "steelblue",
    };
  }

  return (
    <div className={classes.map}>
      <MapContainer center={mapCenter} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWJpLXRyYW5zaXQtZGF0YS10ZWFtIiwiYSI6ImNrcDI4aHFzMzFpMmcydnF3OHd5N3Z0OW8ifQ.IwReYu0rGZko64sy2mbPSg"
        />
        <GeoJSON style={styleSegments} data={props.data} />
      </MapContainer>
    </div>
  );
};

export default Map;
