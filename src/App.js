import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import data from "./Data/mbta_proposed_segments.json";
import { useState } from "react";

function App() {
  const [frequencyType, setFrequencyType] = useState("max_freq");

  function changeFrequency() {
    setFrequencyType((prev) =>
      prev === "max_freq" ? "frequency" : "max_freq"
    );
  }

  return (
    <div className="App">
      <Sidebar changeFrequency={changeFrequency} variable={frequencyType} />
      <Map data={data} variable={frequencyType} />
    </div>
  );
}

export default App;
