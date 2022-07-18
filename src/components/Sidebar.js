import classes from "./Sidebar.module.css";
import { useState, useRef } from "react";
import SliderInput from "./Slider";
import Chart from "./Chart";
import { initialWeights, colors, grades } from "../globals";

const Sidebar = ({
  data,
  adjustFilters,
  toggled,
  setToggled,
  highFrequency,
  setShowHighFrequency,
}) => {
  const {
    w1: weight1,
    w2: weight2,
    w3: weight3,
    w4: weight4,
    w5: weight5,
  } = initialWeights;

  const [w1, setW1] = useState({ x: weight1 });
  const [w2, setW2] = useState({ x: weight2 });
  const [w3, setW3] = useState({ x: weight3 });
  const [w4, setW4] = useState({ x: weight4 });
  const [w5, setW5] = useState({ x: weight5 });
  const [error, setError] = useState(false);

  const sliderRange = [0, 8];
  const inputRef = useRef();
  const maxValue = Math.max(...data);

  const submitHandler = () => {
    const newWeights = { w1: w1.x, w2: w2.x, w3: w3.x, w4: w4.x, w5: w5.x };

    let filter = inputRef.current.value;
    if (filter > maxValue) {
      setError(true);
      return;
    }
    setError(false);
    adjustFilters(newWeights, filter);
  };

  const reset = () => {
    setW1({ x: weight1 });
    setW2({ x: weight2 });
    setW3({ x: weight3 });
    setW4({ x: weight4 });
    setW5({ x: weight5 });

    inputRef.current.value = 0;
  };

  const toggleHandler = () => {
    setToggled((state) => (state === "2021" ? "2019" : "2021"));
  };

  const highFrequencyHandler = () => {
    setShowHighFrequency((state) => !state);
  };

  return (
    <div className={classes.Sidebar}>
      <h2>MBTA Transit Priority Analysis</h2>
      <div className={classes.header}>
        <p>
          Adjust the sliders to change the weights of each factor. Zoom in to
          view both direction of travel
        </p>
        <div className={classes["toggle-container"]}>
          <p>{toggled}</p>
          <label className={classes["toggle-switch"]}>
            <input
              type="checkbox"
              checked={toggled === "2021" ? true : false}
              onChange={toggleHandler}
            />
            <span className={classes.switch} />
          </label>
          <label className={classes["toggle-switch"]}>
            <input
              type="checkbox"
              checked={highFrequency}
              onChange={highFrequencyHandler}
            />
            <span className={classes.switch} />
          </label>
        </div>
      </div>
      <Chart data={data} />
      <div className={classes.sliders}>
        <SliderInput
          label="Frequency"
          range={sliderRange}
          state={w1}
          setState={setW1}
        />
        <SliderInput
          label="Excess Passenger Time"
          range={sliderRange}
          state={w2}
          setState={setW2}
        />
        <SliderInput
          label="Travel Time"
          range={sliderRange}
          state={w3}
          setState={setW3}
        />
        <SliderInput
          label="Travel Time Variability"
          range={sliderRange}
          state={w4}
          setState={setW4}
        />
        <SliderInput
          label="Operations and Maintainence"
          range={sliderRange}
          state={w5}
          setState={setW5}
        />
      </div>
      <div>
        <div className={classes.buttonset}>
          <p style={{ margin: "0px" }}>
            Show segments with a score of at least
          </p>
          <select
            className={classes.inputField}
            ref={inputRef}
            type="number"
            max={maxValue}
            min={0}
          >
            {grades.map((g, idx) => {
              return (
                <option
                  className={classes["dropdown-option"]}
                  value={idx + 1}
                  key={g}
                >
                  {g}
                </option>
              );
            })}
          </select>

          <button className={classes.button} onClick={submitHandler}>
            Calculate
          </button>
          <button
            className={classes.button}
            onClick={reset}
            style={{ backgroundColor: colors[1] }}
          >
            Reset
          </button>
        </div>
        {error && <p>Threshold is too high</p>}
      </div>
    </div>
  );
};

export default Sidebar;
