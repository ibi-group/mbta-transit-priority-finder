import Slider from "react-input-slider";
import { Fragment } from "react";

const SliderInput = (props) => {
  return (
    <Fragment>
      <p>{props.label}</p>
      <Slider
        styles={{
          active: {
            backgroundColor: "#1F91AD",
          },
          track: {
            backgroundColor: "rgba(255,255,255, .2)",
          },
        }}
        axis="x"
        x={props.state.x}
        xmin={props.range[0]}
        xmax={props.range[1]}
        onChange={({ x }) => props.setState((state) => ({ ...state, x }))}
      />
      <p>{props.state.x}</p>
    </Fragment>
  );
};

export default SliderInput;
