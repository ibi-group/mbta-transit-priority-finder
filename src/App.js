import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import segmentData from "./Data/mbta_BNR_segments_all_lines.json";
import { useState } from "react";
import { cols2019, sharedCols } from "./globals";
//@ts-ignore
import Explainer from "./components/Explainer.tsx";

function App() {
  //@ts-ignore
  const [data, setData] = useState(segmentData.features);
  const [maybes, setMaybes] = useState(segmentData.features);
  const [showHighFrequency, setShowHighFrequency] = useState(false);
  const [showNewRoad, setShowNewRoad] = useState(false);

  //recalculate score - triggered by the calculate button - resets the data state, which re-renders map
  const recalculateScore = (freqBounds, socialBounds, travelBounds) => {
    //@ts-ignore
    const { features } = segmentData;

    const [lowerFreq, upperFreq] = freqBounds;
    const [lowerSocial, upperSocial] = socialBounds;
    const [lowerTravel, upperTravel] = travelBounds;

    //@ts-ignore
    const included = features.filter(({ properties }) => {
      //@ts-ignore
      const freq = properties[sharedCols.freq_score];
      //@ts-ignore
      const sb = properties[cols2019[3]];
      //@ts-ignore
      const tt = properties[cols2019[2]];

      return (
        (freq >= upperFreq && sb > lowerSocial && tt > lowerTravel) ||
        (sb >= upperSocial && freq > lowerFreq && tt > lowerTravel) ||
        (tt >= upperTravel && freq > lowerFreq && sb > lowerSocial)
      );
    });

    //@ts-ignore
    const questionable = features.filter(({ properties }) => {
      //@ts-ignore
      const freq = properties[sharedCols.freq_score];
      //@ts-ignore
      const sb = properties[cols2019[3]];
      //@ts-ignore
      const tt = properties[cols2019[2]];

      return (
        (freq > lowerFreq && freq < upperFreq) ||
        (sb > lowerSocial && sb < upperSocial) ||
        (tt > lowerTravel && tt < upperTravel)
      );
    });

    setData(included);
    setMaybes(questionable);
  };

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
