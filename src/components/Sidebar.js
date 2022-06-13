import classes from "./Sidebar.module.css";
import { useState, useRef } from "react";
import SliderInput from "./Slider";
import Chart from "./Chart";

const Sidebar = (props) => {
  const [w1, setW1] = useState({ x: 1 });
  const [w2, setW2] = useState({ x: 1 });
  const sliderRange = [1, 8];
  const inputRef = useRef();

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
        <button
          className={classes.button}
          onClick={() =>
            props.calculateWeights(w1.x, w2.x, inputRef.current.value)
          }
        >
          Calculate
        </button>

        <button
          className={classes.button}
          onClick={() => props.changeFrequency()}
        >
          {props.variable}
        </button>
      </div>
      <Chart data={props.data} type={props.variable} />
    </div>
  );
};

export default Sidebar;
