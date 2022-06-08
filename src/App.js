import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import data from "./Data/mbta_proposed_segments.json";
import { useState } from "react";

function App() {
  const [frequencyType, setFrequencyType] = useState("max_freq");
  const [weights, setWeights] = useState([0.5, 0.5]);

  function changeFrequency() {
    setFrequencyType((prev) =>
      prev === "max_freq" ? "frequency" : "max_freq"
    );
  }

  function calculateWeights(w1, w2) {
    const total = w1 + w2;
    setWeights([(w1 / total).toFixed(1), (w2 / total).toFixed(1)]);
  }

  return (
    <div className="App">
      <Sidebar
        changeFrequency={changeFrequency}
        variable={frequencyType}
        calculateWeights={calculateWeights}
      />
      <Map data={data} variable={frequencyType} />
    </div>
  );
}

export default App;
