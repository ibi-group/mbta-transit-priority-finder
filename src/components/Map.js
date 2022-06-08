import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-polylineoffset";

const Map = (props) => {
  const mapCenter = [42.3601, -71.0589];

  const lines = props.data.features.map((feat) => {
    //reverse coords for polyline
    const coordList = feat.geometry.coordinates.map((pair) => {
      return [pair[1], pair[0]];
    });

    const IB = feat.properties.dir_id === "Inbound";

    const options = {
      color: IB ? "darkorange" : "steelblue",
      offset: IB ? 5 : 0,
    };

    return (
      <Polyline
        key={Math.random()}
        positions={coordList}
        pathOptions={options}
      />
    );
  });

  return (
    <div className={classes.map}>
      <MapContainer center={mapCenter} zoom={13} minZoom={10} maxZoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWJpLXRyYW5zaXQtZGF0YS10ZWFtIiwiYSI6ImNrcDI4aHFzMzFpMmcydnF3OHd5N3Z0OW8ifQ.IwReYu0rGZko64sy2mbPSg"
        />
        {lines}
      </MapContainer>
    </div>
  );
};

export default Map;
