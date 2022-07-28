import classes from "./Sidebar.module.css";
import { useState, useRef } from "react";
import MultiRangeSlider from "./MultiRangeSlider";

const Sidebar = ({
  highFrequency,
  setShowHighFrequency,
  showNewRoad,
  setShowNewRoad,
  recalculateScore,
}) => {
  const [frequencyBounds, setFrequencyBounds] = useState([1, 6]);
  const [socialBounds, setSocialBounds] = useState([1, 6]);
  const [travelBounds, setTravelBounds] = useState([1, 6]);

  const highFrequencyHandler = () => {
    setShowHighFrequency((state) => !state);
  };

  const newRoadHandler = () => {
    setShowNewRoad((state) => !state);
  };

  const submitHandler = () => {
    recalculateScore(frequencyBounds, socialBounds, travelBounds);
  };

  return (
    <div className={classes.Sidebar}>
      <div className={classes.header}>
        <h2>MBTA Transit Priority Analysis</h2>
        <p>
          Adjust the sliders to change the weights of each factor. Zoom in to
          view both direction of travel
        </p>
      </div>
      <div className={classes["toggle-container"]}>
        <p>High-Frequency Network</p>
        <label className={classes["toggle-switch"]}>
          <input
            type="checkbox"
            checked={highFrequency}
            onChange={highFrequencyHandler}
          />
          <span className={classes.switch} />
        </label>
        <p>New Roadway</p>
        <label className={classes["toggle-switch"]}>
          <input
            type="checkbox"
            checked={showNewRoad}
            onChange={newRoadHandler}
          />
          <span className={classes.switch} />
        </label>
      </div>
      <div className={classes.sliders}></div>

      <div className={classes.sliders}>
        <MultiRangeSlider
          name="Frequency"
          bounds={frequencyBounds}
          setState={setFrequencyBounds}
        />
        <MultiRangeSlider
          name="Social Cost"
          bounds={socialBounds}
          setState={setSocialBounds}
        />
        <MultiRangeSlider
          name="Travel Time"
          bounds={travelBounds}
          setState={setTravelBounds}
        />
      </div>
      <button className={classes.button} onClick={submitHandler}>
        Calculate
      </button>
    </div>
  );
};

export default Sidebar;
