import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Pane,
  LayersControl,
} from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-polylineoffset";
import { scale } from "chroma-js";
import Legend from "./Legend";
import useRailRoutes from "./useRailRoutes";
import SegmentsOverlay from "./SegmentsOverlay";
import StopsOverlay from "./StopsOverlay";
import { useState } from "react";
import { colors } from "../globals";

//Polyline offset circles issue doc: https://stackoverflow.com/questions/53708398/leaflet-polyline-precision-loss-on-zoom-out

const Map = ({ variable, data, showHighFrequency }) => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const showBothSides = zoomLevel >= 16 ? true : false;
  const showStops = zoomLevel >= 15 ? true : false;
  const mapCenter = [42.3601, -71.0589];

  //Create color scale
  const colorScale = scale(colors).domain([1, 6]);

  //custom hook for getting data from the TransitLand API for the chosen mode
  const subway = useRailRoutes(1);
  const rail = useRailRoutes(2);
  const lightRail = useRailRoutes(0);

  function styleRail(feature) {
    return {
      weight: 1,
      color: "#D6AEC0",
    };
  }

  return (
    <div className={classes.map}>
      <MapContainer center={mapCenter} zoom={13} minZoom={10} maxZoom={18}>
        <Pane name="segment-tooltip" style={{ zIndex: 650 }}></Pane>
        <Pane name="stops-overlay" style={{ zIndex: 499 }}>
          {showStops && <StopsOverlay />}
        </Pane>
        <SegmentsOverlay
          variable={variable}
          data={data}
          scale={colorScale}
          showBothSides={showBothSides}
          setZoomLevel={setZoomLevel}
          showHighFrequency={showHighFrequency}
        />
        <Pane name="subway-pane" style={{ zIndex: 420 }}>
          {subway && (
            <GeoJSON key={Math.random()} style={styleRail} data={subway} />
          )}
          {rail && (
            <GeoJSON key={Math.random()} style={styleRail} data={rail} />
          )}
          {lightRail && (
            <GeoJSON key={Math.random()} style={styleRail} data={lightRail} />
          )}
        </Pane>
        <LayersControl position="topleft">
          <LayersControl.BaseLayer name="Streets" checked>
            <Pane name="basemap" style={{ zIndex: 300 }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
            </Pane>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
      <Legend colors={colors} />
    </div>
  );
};

export default Map;
