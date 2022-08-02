import "./MultiRangeSlider.css";
import { mapColors } from "../globals";

const MultiRangeSlider = ({ bounds, name, setState }) => {
  const [min, max] = bounds;

  const handleMinChange = (event) => {
    const newValue = Math.min(+event.target.value, max - 1);
    setState((state) => [newValue, state[1]]);
  };

  const handleMaxChange = (event) => {
    const newValue = Math.max(+event.target.value, min + 1);
    setState((state) => [state[0], newValue]);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="7"
        step="1"
        value={min}
        onChange={handleMinChange}
        className="thumb thumb--zindex-3 thumb-low"
      />
      <input
        type="range"
        min="0"
        max="7"
        step="1"
        value={max}
        onChange={handleMaxChange}
        className="thumb thumb--zindex-4 thumb-high"
      />

      <div className="slider">
        <div className="slider__track" />
        <div className="slider__range" />
      </div>
      <div>
        <p style={{ fontSize: "14px" }}>{name}</p>
        <p style={{ fontSize: "12px", color: "#ffb35c" }}>Lower: {min}</p>
        <p style={{ fontSize: "12px", color: mapColors[2] }}>Upper: {max}</p>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
