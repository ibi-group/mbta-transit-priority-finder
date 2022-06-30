import Slider from "react-input-slider";
import { Fragment } from "react";
import "./slider.css";

const SliderInput = (props) => {
  const disabled = props.state.x === 0 ? true : false;

  return (
    <Fragment>
      <p className={disabled ? "text-disabled" : ""}>{props.label}</p>
      <Slider
        styles={{
          active: {
            backgroundColor: "#1F91AD",
          },
          track: {
            backgroundColor: disabled
              ? "rgba(255,255,255,.1)"
              : "rgba(255,255,255, .2)",
          },
          thumb: {
            backgroundColor: disabled ? "grey" : "#FFF",
          },
        }}
        axis="x"
        x={props.state.x}
        xmin={props.range[0]}
        xmax={props.range[1]}
        onChange={({ x }) => props.setState((state) => ({ ...state, x }))}
      />
      <p className={disabled ? "text-disabled" : ""}>{props.state.x}</p>
    </Fragment>
  );
};

export default SliderInput;
