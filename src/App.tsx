import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import segmentData from "./Data/mbta_segments_all_lines.json";
import { useState, useMemo, useCallback } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { initialWeights } from "./globals";
//@ts-ignore
import Explainer from "./components/Explainer.tsx";

enum Year {
  y2021 = "2021",
  y2019 = "2019",
}

interface WeightObject {
  w1: number;
  w2: number;
  w3: number;
  w4: number;
}

function App() {
  const [weights, setWeights] = useState(initialWeights);
  const [filter, setFilter] = useState(1);
  const [year, setYear] = useState(Year.y2021);
  const [loading, setLoading] = useState(false);
  const variable: string = "total_score";

  function adjustFilters(newWeights: WeightObject, newFilterValue: number) {
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

  const recalculateScore = useCallback(
    (weights: WeightObject, filter: number, year: Year) => {
      setLoading(true);
      const { w1, w2, w3, w4 } = weights;
      const cols =
        year === Year.y2021
          ? ["time_variability", "xpt", "travel_time"]
          : ["time_variability2019", "xpt2019", "travel_time2019"];

      //@ts-ignore
      const newData = segmentData.features
        .map((d: any) => {
          const {
            freq_score,
            [cols[0]]: time_variability,
            [cols[1]]: xpt,
            [cols[2]]: travel_time,
            _merge,
          } = d.properties;

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
        .filter((d: any) => d.properties.total_score >= filter);

      const values = newData.map((d: any) => d.properties.total_score);
      setLoading(false);

      return [newData, values];
    },
    []
  );

  //recalculate score when weights or filter changes
  const [mapData, scoreValues] = useMemo(
    () => recalculateScore(weights, filter, year),
    [recalculateScore, weights, filter, year]
  );

  return (
    <div className="App">
      {loading && <LoadingSpinner />}
      <Explainer />
      <Sidebar
        data={scoreValues}
        adjustFilters={adjustFilters}
        toggled={year}
        setToggled={setYear}
      />
      {/*@ts-ignore*/}
      <Map data={mapData} values={scoreValues} variable={variable} />
    </div>
  );
}

export default App;
