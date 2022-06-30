import classes from "./Sidebar.module.css";
import { useState, useRef } from "react";
import SliderInput from "./Slider";
import Chart from "./Chart";

const Sidebar = (props) => {
  const [w1, setW1] = useState({ x: 1 });
  const [w2, setW2] = useState({ x: 1 });
  const [w3, setW3] = useState({ x: 1 });
  const [w4, setW4] = useState({ x: 1 });
  const [error, setError] = useState(false);

  const sliderRange = [0, 8];
  const inputRef = useRef();
  const maxValue = Math.max(...props.data);

  const submitHandler = () => {
    const data = { w1: w1.x, w2: w2.x, w3: w3.x, w4: w4.x };

    let filter = inputRef.current.value;
    if (filter >= maxValue) {
      setError(true);
      return;
    }
    setError(false);
    props.adjustFilters(data, filter);
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
          label="Demographics"
          range={sliderRange}
          state={w3}
          setState={setW3}
        />
        <SliderInput
          label="Other factors"
          range={sliderRange}
          state={w4}
          setState={setW4}
        />
      </div>
      <div>
        <div className={classes.buttonset}>
          <p style={{ margin: "0px" }}>
            Show segments with a score of at least
          </p>
          <input
            className={classes.inputField}
            ref={inputRef}
            type="number"
            max={maxValue}
            min={0}
          ></input>

          <button className={classes.button} onClick={submitHandler}>
            Calculate
          </button>
        </div>
        {error && <p>Threshold is too high</p>}
      </div>
      <Chart data={props.data} />
    </div>
  );
};

export default Sidebar;
