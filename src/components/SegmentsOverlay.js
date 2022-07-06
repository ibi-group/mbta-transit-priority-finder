import { useMemo } from "react";
import { useMapEvents, Popup, Polyline, GeoJSON } from "react-leaflet";
import classes from "./Map.module.css";

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

      const options = {
        weight: 3,
        color: scale(freq),
        offset: 5,
        dashArray: properties?.side === "Side1" ? "10, 5" : "",
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
            <strong>Start Stop:</strong> {properties.s_st_name}
            <br />
            <strong>End Stop:</strong> {properties.e_st_name}
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
      color: scale(feature.properties[variable]),
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
  return renderedLayer;
};

export default SegmentsOverlay;
