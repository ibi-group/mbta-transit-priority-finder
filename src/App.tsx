import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import segmentData from "./Data/mbta_BNR_segments_all_lines.json";
import { useState, useMemo, useCallback } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { initialWeights, cols2021, cols2019, sharedCols } from "./globals";
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
  w5: number;
}

function App() {
  const [weights, setWeights] = useState(initialWeights);
  const [filter, setFilter] = useState(1);
  const [year, setYear] = useState(Year.y2021);
  const [showHighFrequency, setShowHighFrequency] = useState(false);
  const [showNewRoad, setShowNewRoad] = useState(false);
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
    (
      weights: WeightObject,
      filter: number,
      year: Year,
      highFrequency: boolean,
      newRoad: boolean
    ) => {
      setLoading(true);
      const { w1, w2, w3, w4, w5 } = weights;
      const cols = year === Year.y2021 ? cols2021 : cols2019;

      //@ts-ignore
      let newData = segmentData.features
        .map((d: any) => {
          const {
            freq_score,
            [cols[0]]: time_variability,
            [cols[1]]: xpt,
            [cols[2]]: travel_time,
            [cols[3]]: om_score,
            _merge,
          } = d.properties;

          const score1 = freq_score * w1;
          const score2 = time_variability * w2;
          const score3 = travel_time * w3;
          const score4 = xpt * w4;
          const score5 = om_score * w5;

          const weightedAvg = Math.round(
            (score1 + score2 + score3 + score4 + score5) /
              (w1 + w2 + w3 + w4 + w5)
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

      //filter to just new roadway if this option is selected
      if (newRoad) {
        newData = newData.filter(
          (d: any) => d.properties[sharedCols.new_road] === "new roadway"
        );
      }

      //filter to just high freq network for chart data if this option is selected
      let highFreqNetwork;
      if (highFrequency) {
        //prettier-ignore
        const regex = new RegExp("T{1}\\d+", "g");
        highFreqNetwork = newData.filter((d: any) =>
          regex.test(d.properties.route_name)
        );
        console.log(highFreqNetwork);
      }

      const chartData = highFrequency ? highFreqNetwork : newData;

      //@ts-ignore
      const values = chartData.map((d: any) => d.properties.total_score);

      setLoading(false);

      return [newData, values];
    },
    []
  );

  //recalculate score when weights or filter changes
  const [mapData, scoreValues] = useMemo(
    () =>
      recalculateScore(weights, filter, year, showHighFrequency, showNewRoad),
    [recalculateScore, weights, filter, year, showHighFrequency, showNewRoad]
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
        highFrequency={showHighFrequency}
        setShowHighFrequency={setShowHighFrequency}
        showNewRoad={showNewRoad}
        setShowNewRoad={setShowNewRoad}
      />
      <Map
        data={mapData}
        variable={variable}
        showHighFrequency={showHighFrequency}
      />
    </div>
  );
}

export default App;
