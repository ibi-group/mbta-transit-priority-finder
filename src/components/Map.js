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
import { scale, limits } from "chroma-js";
import { useState, useMemo, useEffect } from "react";
import Legend from "./Legend";
import LoadingSpinner from "./LoadingSpinner";

const SetDataonZoom = (props) => {
  const map = useMapEvents({
    zoom() {
      props.setZoom(map.getZoom());
    },
  });
  return null;
};

const Map = ({ variable, values, data }) => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);

  const API_KEY = "b2RU44pXMiPzCdedeiTtdwAS6EBBaEMX";

  async function fetchRoutes() {
    const response = await fetch(
      "https://transit.land/api/v2/rest/routes?operator_onestop_id=o-drt-mbta&route_type=1&format=geojson",
      {
        headers: {
          apikey: API_KEY,
        },
      }
    );
    try {
      const data = await response.json();
      setRoutes(data.features);
    } catch {
      console.log("error fetching routes!");
    }
  }

  useEffect(() => {
    fetchRoutes();
  }, []);

  const mapCenter = [42.3601, -71.0589];

  //Create color scale
  const colors = scale(["#FFB35C", "#1F91AD"]).colors(10);
  const breaks = limits(values, "q", 10);
  const colorScale = scale(colors).domain(breaks);

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
            <strong>Frequency:</strong> {properties.frequency}
            <br />
            <strong>Max Frequency:</strong> {properties.max_freq}
          </Popup>
        </Polyline>
      );
    });

    return lines;
  };

  const lines = useMemo(() => computePolylines(data.features), [data.features]);

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
          <GeoJSON style={styleLines} data={data.features} />
        )}
        {routes && <GeoJSON key={Math.random()} data={routes} />}
        <SetDataonZoom setZoom={setZoomLevel} />
      </MapContainer>
      <Legend colors={colors} breaks={breaks} />
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Map;
