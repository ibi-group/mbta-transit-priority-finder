import Slider from "react-input-slider";

const SliderInput = (props) => {
  return (
    <div>
      <Slider
        styles={{
          active: {
            backgroundColor: "#1F91AD",
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
