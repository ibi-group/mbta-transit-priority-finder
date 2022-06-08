import classes from "./Sidebar.module.css";
import { useState } from "react";
import SliderInput from "./Slider";

const Sidebar = (props) => {
  const [w1, setW1] = useState({ x: 1 });
  const [w2, setW2] = useState({ x: 1 });

  return (
    <div className={classes.Sidebar}>
      <h2>MBTA Transit Priority Analysis</h2>
      <p>Adjust the sliders to change the weights of each factor</p>
      <p>Zoom in to view both direction of travel</p>
      <button
        className={classes.button}
        onClick={() => props.changeFrequency()}
      >
        {props.variable}
      </button>
      <SliderInput state={w1} setState={setW1} />
      <SliderInput state={w2} setState={setW2} />
      <button
        className={classes.button}
        onClick={() => props.calculateWeights(w1.x, w2.x)}
      >
        Calculate
      </button>
    </div>
  );
};

export default Sidebar;
