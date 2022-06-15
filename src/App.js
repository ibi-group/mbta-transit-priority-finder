import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import data from "./Data/mbta_proposed_segments.json";
import { useState } from "react";

function App() {
  const [frequencyType, setFrequencyType] = useState("max_freq");
  const [threshold, setThreshold] = useState(0);

  const chartData = data.features.map((d) => d.properties[frequencyType]);
  const mapData = data.features.filter(
    (d) => d.properties[frequencyType] >= threshold
  );

  function changeFrequency() {
    setFrequencyType((prev) =>
      prev === "max_freq" ? "frequency" : "max_freq"
    );
  }

  function calculateWeights(weights, filter) {
    const newData = data.features.map((d) => {
      return {
        type: d.type,
        properties: {
          ...d.properties,
          freq_score: d.properties.freq_score * weights.w1,
          time_variability: d.properties.time_variability * weights.w2,
          demographics: d.properties.demographics * weights.w3,
          other_factors: d.properties.other_factors * weights.w4,
        },
        geometry: d.geometry,
      };
    });

    console.log("map data", mapData[0]);
    console.log("transformed data", newData[0]);
    setThreshold(filter);
  }

  return (
    <div className="App">
      <Sidebar
        data={chartData}
        changeFrequency={changeFrequency}
        variable={frequencyType}
        calculateWeights={calculateWeights}
      />
      <Map data={mapData} values={chartData} variable={frequencyType} />
    </div>
  );
}

export default App;
