import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import segmentData from "./Data/mbta_proposed_segments.json";
import { useState } from "react";

function App() {
  const [data, setData] = useState(segmentData.features);
  const variable = "total_score";
  const chartData = data.map((d) => d.properties.total_score);

  function calculateWeights(weights, filter) {
    const newData = data
      .map((d) => {
        const score1 = d.properties.freq_score * weights.w1;
        const score2 = d.properties.time_variability * weights.w2;
        const score3 = d.properties.demographics * weights.w3;
        const score4 = d.properties.other_factors * weights.w4;

        return {
          type: d.type,
          properties: {
            ...d.properties,
            freq_score: score1,
            time_variability: score2,
            demographics: score3,
            other_factors: score4,
            total_score: score1 + score2 + score3 + score4,
          },
          geometry: d.geometry,
        };
      })
      .filter((d) => d.properties.total_score >= filter);

    console.log("transformed data", newData[0]);
    setData(newData);
  }

  return (
    <div className="App">
      <Sidebar data={chartData} calculateWeights={calculateWeights} />
      <Map data={data} values={chartData} variable={variable} />
    </div>
  );
}

export default App;
