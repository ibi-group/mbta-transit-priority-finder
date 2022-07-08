import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import segmentData from "./Data/mbta_segments_all_lines.json";
import { useState, useMemo } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { initialWeights } from "./globals";

function App() {
  const [weights, setWeights] = useState(initialWeights);
  const [filter, setFilter] = useState(1);
  const [year, setYear] = useState("2021");
  const [loading, setLoading] = useState(false);
  const variable = "total_score";

  function adjustFilters(newWeights, newFilterValue) {
    if (
      Object.values(newWeights).every(
        (w, idx) => w === Object.values(weights)[idx]
      ) === false
    ) {
      setWeights(newWeights);
    }

    if (newFilterValue !== filter) {
      setFilter(newFilterValue);
    }
  }

  function recalculateScore(weights, filter) {
    setLoading(true);
    const { w1, w2, w3, w4 } = weights;

    const newData = segmentData.features
      .map((d) => {
        const { freq_score, time_variability, travel_time, xpt, _merge } =
          d.properties;

        const score1 = freq_score * w1;
        const score2 = time_variability * w2;
        const score3 = travel_time * w3;
        const score4 = xpt * w4;

        const weightedAvg = Math.round(
          (score1 + score2 + score3 + score4) / (w1 + w2 + w3 + w4)
        );

        return {
          type: d.type,
          properties: {
            ...d.properties,
            total_score: _merge === "left_only" ? freq_score : weightedAvg,
          },
          geometry: d.geometry,
        };
      })
      .filter((d) => d.properties.total_score >= filter);

    const values = newData.map((d) => d.properties.total_score);
    setLoading(false);

    return [newData, values];
  }

  //recalculate score when weights or filter changes
  const [mapData, scoreValues] = useMemo(
    () => recalculateScore(weights, filter),
    [weights, filter]
  );

  return (
    <div className="App">
      {loading && <LoadingSpinner />}
      <Sidebar
        data={scoreValues}
        adjustFilters={adjustFilters}
        toggled={year}
        setToggled={setYear}
      />
      <Map data={mapData} values={scoreValues} variable={variable} />
    </div>
  );
}

export default App;
