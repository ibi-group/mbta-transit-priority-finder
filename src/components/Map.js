import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Pane,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import classes from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import "leaflet-polylineoffset";
import Legend from "./Legend";
import useRailRoutes from "./useRailRoutes";
import SegmentsOverlay from "./SegmentsOverlay";
import StopsOverlay from "./StopsOverlay";
import { useState } from "react";
import { mapColors, sharedCols } from "../globals";
import IBIcorridors from "../Data/corridors_2021.json";

//Polyline offset circles issue doc: https://stackoverflow.com/questions/53708398/leaflet-polyline-precision-loss-on-zoom-out

const Map = ({ data, maybeSegments, showHighFrequency, showNewRoad }) => {
  const [zoomLevel, setZoomLevel] = useState(13);
  const showBothSides = zoomLevel >= 16 ? true : false;
  const showStops = zoomLevel >= 15 ? true : false;
  const mapCenter = [42.3601, -71.0589];

  //filter to new roadway segments if this options is selected
  function filterData(dataSet, show) {
    return show
      ? dataSet.filter(
          (d) => d.properties[sharedCols.new_road] === "new roadway"
        )
      : dataSet;
  }

  const includedLayerData = filterData(data, showNewRoad);
  const maybeLayerData = filterData(maybeSegments, showNewRoad);

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

  function styleCorridors(feature) {
    return {
      weight: 10,
      color: "orange",
      opacity: 0.4,
    };
  }

  return (
    <div className={classes.map}>
      <MapContainer center={mapCenter} zoom={13} minZoom={10} maxZoom={18}>
        <LayersControl position="topleft">
          <Pane name="segment-tooltip" style={{ zIndex: 650 }}></Pane>
          <LayersControl.Overlay name="IBI-selected corridors" checked>
            <Pane name="IBI-corridors" style={{ zIndex: 501 }}>
              <GeoJSON data={IBIcorridors} style={styleCorridors} />
            </Pane>
          </LayersControl.Overlay>
          <Pane name="stops-overlay" style={{ zIndex: 499 }}>
            {showStops && <StopsOverlay />}
          </Pane>
          <Pane name="included-segments" style={{ zIndex: 450 }}>
            <SegmentsOverlay
              data={includedLayerData}
              color={mapColors}
              showBothSides={showBothSides}
              setZoomLevel={setZoomLevel}
              showHighFrequency={showHighFrequency}
            />
          </Pane>
          <Pane name="maybe-segments" style={{ zIndex: 430 }}>
            <SegmentsOverlay
              data={maybeLayerData}
              color={[mapColors[3]]}
              showBothSides={showBothSides}
              setZoomLevel={setZoomLevel}
              showHighFrequency={showHighFrequency}
            />
          </Pane>

          <LayersControl.Overlay checked name="Rail Lines">
            <Pane name="subway-pane" style={{ zIndex: 420 }}>
              <LayerGroup>
                {subway && (
                  <GeoJSON
                    key={Math.random()}
                    style={styleRail}
                    data={subway}
                  />
                )}
                {rail && (
                  <GeoJSON key={Math.random()} style={styleRail} data={rail} />
                )}
                {lightRail && (
                  <GeoJSON
                    key={Math.random()}
                    style={styleRail}
                    data={lightRail}
                  />
                )}
              </LayerGroup>
            </Pane>
          </LayersControl.Overlay>
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
      <Legend colors={mapColors} />
    </div>
  );
};

export default Map;
