import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import data from "./Data/mbta_proposed_segments.json";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Map data={data} />
    </div>
  );
}

export default App;
