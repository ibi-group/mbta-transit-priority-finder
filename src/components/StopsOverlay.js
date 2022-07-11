import stopData from "../Data/proposed_stops.json";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";

const StopsOverlay = () => {
  function createCircleMarker(feature, latlng) {
    // Change the values of these options to change the symbol's appearance
    const rail = feature.properties.type === "rail";

    let options = {
      radius: rail ? 3 : 5,
      fillColor: rail ? "#D6AEC0" : "lightgrey",
      color: rail ? "#D6AEC0" : "grey",
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
