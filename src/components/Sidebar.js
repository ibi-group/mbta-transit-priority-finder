import classes from "./Sidebar.module.css";
import { useState } from "react";
import SliderInput from "./Slider";
import Chart from "./Chart";

const Sidebar = (props) => {
  const [w1, setW1] = useState({ x: 1 });
  const [w2, setW2] = useState({ x: 1 });
  const sliderRange = [1, 8];

  return (
    <div className={classes.Sidebar}>
      <h2>MBTA Transit Priority Analysis</h2>
      <p>
        Adjust the sliders to change the weights of each factor. Zoom in to view
        both direction of travel
      </p>
      <button
        className={classes.button}
        onClick={() => props.changeFrequency()}
      >
        {props.variable}
      </button>
      <SliderInput range={sliderRange} state={w1} setState={setW1} />
      <SliderInput range={sliderRange} state={w2} setState={setW2} />
      <button
        className={classes.button}
        onClick={() => props.calculateWeights(w1.x, w2.x)}
      >
        Calculate
      </button>
      <Chart data={props.data} />
    </div>
  );
};

export default Sidebar;
