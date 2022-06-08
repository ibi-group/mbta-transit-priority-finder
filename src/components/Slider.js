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
        xmin={1}
        xmax={8}
        onChange={({ x }) => props.setState((state) => ({ ...state, x }))}
      />
      <p>{props.state.x}</p>
    </div>
  );
};

export default SliderInput;
