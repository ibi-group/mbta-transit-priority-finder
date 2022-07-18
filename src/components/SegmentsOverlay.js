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
  showHighFrequency,
}) => {
  //tracks the zoom level
  const map = useMapEvents({
    zoom() {
      setZoomLevel(map.getZoom());
    },
  });

  //Set the weight and opacity options for both the polyline and geojson layers
  function setFeatureOptions(properties) {
    const newSegment = properties[sharedCols.merge21] === "left_only";
    const weight = newSegment ? 2 : 4;
    //prettier-ignore
    const regex = new RegExp("T{1}\\d+", 'g');
    const highFreq = regex.test(properties.route_name);
    const opacity = showHighFrequency
      ? highFreq
        ? 1
        : 0.1
      : newSegment
      ? 0.7
      : 1;

    return [weight, opacity];
  }

  //create a polyline for each segment of the data
  const computePolylines = (featureSet) => {
    const lines = featureSet.map(({ geometry, properties }) => {
      //reverse coords for polyline
      const coordList = geometry.coordinates.map((pair) => {
        return [pair[1], pair[0]];
      });

      const score = properties[variable];
      const [weight, opacity] = setFeatureOptions(properties);

      const options = {
        weight: weight,
        opacity: opacity,
        color: scale(score),
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
  const lines = useMemo(
    () => computePolylines(data),
    [data, showHighFrequency]
  );

  //styling configuration for map elements
  function styleLines({ properties }) {
    const [weight, opacity] = setFeatureOptions(properties);

    return {
      color: scale(properties[variable]),
      opacity: opacity,
      weight: weight,
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
  }, [showBothSides, showHighFrequency, data, lines]);

  //render method
  return (
    <Pane name="segments" style={{ zIndex: 450 }}>
      {renderedLayer}
    </Pane>
  );
};

export default SegmentsOverlay;
