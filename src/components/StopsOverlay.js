import stopData from "../Data/proposed_stops.json";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";

const StopsOverlay = () => {
  function createCircleMarker(feature, latlng) {
    // Change the values of these options to change the symbol's appearance
    let options = {
      radius: 5,
      fillColor: "lightgrey",
      color: "grey",
      weight: 1,
      opacity: 1,
      fillOpacity: 1,
      pane: "stops-overlay",
    };
    return L.circleMarker(latlng, options);
  }

  function makePopup(feature, layer) {
    layer.bindPopup(
      "<strong>Stop ID:</strong>" +
        feature.properties?.stop_id +
        "<br>" +
        feature.properties?.stop_desc
    );
  }

  return (
    <GeoJSON
      key={Math.random()}
      data={stopData.features}
      pointToLayer={createCircleMarker}
      onEachFeature={makePopup}
    />
  );
};

export default StopsOverlay;
