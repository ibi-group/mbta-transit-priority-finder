import { useMemo } from "react";
import { useMapEvents, Popup, Polyline, GeoJSON, Pane } from "react-leaflet";
import classes from "./Map.module.css";
import { sharedCols } from "../globals";

//Child component that listens for changes in zoom and sets state
const SegmentsOverlay = ({
  variable,
  data,
  scale,
  setZoomLevel,
  showBothSides,
}) => {
  //tracks the zoom level
  const map = useMapEvents({
    zoom() {
      setZoomLevel(map.getZoom());
    },
  });

  //create a polyline for each segment of the data
  const computePolylines = (featureSet) => {
    const lines = featureSet.map(({ geometry, properties }) => {
      //reverse coords for polyline
      const coordList = geometry.coordinates.map((pair) => {
        return [pair[1], pair[0]];
      });

      const freq = properties[variable];
      const newSegment = properties[sharedCols.merge21] === "left_only";

      const options = {
        weight: newSegment ? 2 : 4,
        opacity: newSegment ? 0.7 : 1,
        color: scale(freq),
        offset: 10,
        dashArray: properties[sharedCols.side] === "Side1" ? "10, 5" : "",
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
          <Popup pane="segment-tooltip">
            <strong>Start Stop:</strong> {properties.s_st_name}
            <br />
            <strong>End Stop:</strong> {properties.e_st_name}
            <br />
            <strong>Routes:</strong> {properties.route_name}
            <br />
            <strong>All-Day Volume:</strong>{" "}
            {properties[sharedCols.all_day_vol]}
            <br />
            <strong>Max Frequency:</strong> {properties[sharedCols.max_freq]}
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
    const newSegment = feature.properties[sharedCols.merge21] === "left_only";

    return {
      color: scale(feature.properties[variable]),
      opacity: newSegment ? 0.7 : 1,
      weight: newSegment ? 2 : 4,
      lineJoin: "round",
    };
  }

  //only re-render lines if the data changes via user selection or the zoom level hits the threshold
  const renderedLayer = useMemo(() => {
    const dataToRender = showBothSides ? (
      lines
    ) : (
      <GeoJSON key={Math.random()} style={styleLines} data={data} />
    );
    return dataToRender;
  }, [showBothSides, data, lines]);

  //render method
  return (
    <Pane name="segments" style={{ zIndex: 450 }}>
      {renderedLayer}
    </Pane>
  );
};

export default SegmentsOverlay;
