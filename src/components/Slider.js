import Slider from "react-input-slider";

const SliderInput = (props) => {
  return (
    <div>
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
    </div>
  );
};

export default SliderInput;
