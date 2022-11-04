import { useMemo } from "react";
import { useMapEvents, Popup, Polyline, GeoJSON } from "react-leaflet";
import classes from "./Map.module.css";
import { sharedCols } from "../globals";

//Child component that listens for changes in zoom and sets state
const SegmentsOverlay = ({
  data,
  color,
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

  //only re-render lines if the data changes via user selection or the zoom level hits the threshold
  const renderedLayer = useMemo(() => {
    //Set the weight and opacity options for both the polyline and geojson layers
    function setFeatureOptions(properties) {
      const newSegment = properties[sharedCols.merge] === "left_only";
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

      const segmentColor =
        color.length > 1
          ? properties.score === 3
            ? color[0]
            : properties.score === 2
            ? color[1]
            : color[2]
          : color[0];

      return [weight, opacity, segmentColor];
    }

    //create a polyline for each segment of the data
    const computePolylines = (featureSet) => {
      console.log("computing polylines");
      const lines = featureSet.map(({ geometry, properties }) => {
        //reverse coords for polyline
        const coordList = geometry.coordinates.map((pair) => {
          return [pair[1], pair[0]];
        });

        const [weight, opacity, color] = setFeatureOptions(properties);

        const options = {
          weight: weight,
          opacity: opacity,
          color: color,
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
              <strong>All-Day Bus Volume:</strong>{" "}
              {properties[sharedCols.all_day_vol]}
              <br />
              <strong>Maximum 1-hour Bus Volume:</strong>{" "}
              {properties[sharedCols.max_freq]}
              <br />
              <strong>Service Offering Score</strong>{" "}
              {properties[sharedCols.freq_score]}
              <br />
              <strong>Social Cost</strong> {properties[sharedCols.social_cost]}
              <br />
              <strong>Social Cost Score</strong> {properties[sharedCols.social_cost_score]}
              <strong>Passenger Experience Score</strong> {properties[sharedCols.travel_time]}
            </Popup>
          </Polyline>
        );
      });
      return lines;
    };
    //styling configuration for map elements
    function styleLines({ properties }) {
      const [weight, opacity, color] = setFeatureOptions(properties);

      return {
        color: color,
        opacity: opacity,
        weight: weight,
        lineJoin: "round",
      };
    }
    //only recompute lines if the data has changed
    const dataToRender = showBothSides ? (
      computePolylines(data)
    ) : (
      <GeoJSON key={Math.random()} style={styleLines} data={data} />
    );
    return dataToRender;
  }, [showBothSides, showHighFrequency, data]);

  //render method
  return <>{renderedLayer}</>;
};

export default SegmentsOverlay;
