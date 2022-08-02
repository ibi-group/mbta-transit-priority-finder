import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import segmentData from "./Data/mbta_BNR_segments_all_lines.json";
import { useEffect, useState } from "react";
import { sharedCols, initialWeights } from "./globals";
import Explainer from "./components/Explainer.tsx";

function App() {
  const [data, setData] = useState(null);
  const [maybes, setMaybes] = useState(null);
  const [showHighFrequency, setShowHighFrequency] = useState(false);
  const [showNewRoad, setShowNewRoad] = useState(false);

  //recalculate score - triggered by the calculate button - resets the data state, which re-renders map
  const recalculateScore = (freqBounds, socialBounds, travelBounds) => {
    const { features } = segmentData;

    const [lowerFreq, upperFreq] = freqBounds;
    const [lowerSocial, upperSocial] = socialBounds;
    const [lowerTravel, upperTravel] = travelBounds;

    const included = features
      .filter(({ properties }) => {
        const freq = properties[sharedCols.freq_score];
        const sb = properties[sharedCols.social_cost_score];
        const tt = properties[sharedCols.pass_exp_score];

        return (
          (freq >= upperFreq && sb > lowerSocial && tt > lowerTravel) ||
          (sb >= upperSocial && freq > lowerFreq && tt > lowerTravel) ||
          (tt >= upperTravel && freq > lowerFreq && sb > lowerSocial)
        );
      })
      .map(({ properties, geometry }) => {
        let count = 0;

        if (properties[sharedCols.freq_score] >= upperFreq) count += 1;
        if (properties[sharedCols.social_cost_score] >= upperSocial) count += 1;
        if (properties[sharedCols.pass_exp_score] >= upperTravel) count += 1;

        return {
          type: "Feature",
          properties: { ...properties, score: count },
          geometry: geometry,
        };
      });

    const questionable = features.filter(({ properties }) => {
      const freq = properties[sharedCols.freq_score];
      const sb = properties[sharedCols.social_cost_score];
      const tt = properties[sharedCols.pass_exp_score];

      return (
        freq > lowerFreq &&
        freq < upperFreq &&
        sb > lowerSocial &&
        sb < upperSocial &&
        tt > lowerTravel &&
        tt < upperTravel
      );
    });

    setData(included);
    setMaybes(questionable);
  };

  useEffect(() => {
    const { freq, sb, travel } = initialWeights;
    recalculateScore(freq, sb, travel);
  }, []);

  return (
    <div className="App">
      <Explainer />
      <Sidebar
        highFrequency={showHighFrequency}
        setShowHighFrequency={setShowHighFrequency}
        showNewRoad={showNewRoad}
        setShowNewRoad={setShowNewRoad}
        recalculateScore={recalculateScore}
      />
      <Map
        data={data}
        maybeSegments={maybes}
        showHighFrequency={showHighFrequency}
        showNewRoad={showNewRoad}
      />
    </div>
  );
}

export default App;
