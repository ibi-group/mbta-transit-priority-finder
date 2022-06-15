import classes from "./Sidebar.module.css";
import { useState, useRef } from "react";
import SliderInput from "./Slider";
import Chart from "./Chart";

const Sidebar = (props) => {
  const [w1, setW1] = useState({ x: 1 });
  const [w2, setW2] = useState({ x: 1 });
  const [w3, setW3] = useState({ x: 1 });
  const [w4, setW4] = useState({ x: 1 });

  const sliderRange = [1, 8];
  const inputRef = useRef();

  const submitHandler = () => {
    const data = { w1: w1.x, w2: w2.x, w3: w3.x, w4: w4.x };
    props.adjustFilters(data, inputRef.current.value);
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
      <SliderInput range={sliderRange} state={w1} setState={setW1} />
      <SliderInput range={sliderRange} state={w2} setState={setW2} />
      <SliderInput range={sliderRange} state={w3} setState={setW3} />
      <SliderInput range={sliderRange} state={w4} setState={setW4} />
      <div>
        <p>Show segments with a score of at least</p>
        <input
          className={classes.inputField}
          ref={inputRef}
          type="number"
          max={50}
          min={0}
        ></input>
      </div>
      <div className={classes.buttonset}>
        <button className={classes.button} onClick={submitHandler}>
          Calculate
        </button>
      </div>
      <Chart data={props.data} />
    </div>
  );
};

export default Sidebar;
