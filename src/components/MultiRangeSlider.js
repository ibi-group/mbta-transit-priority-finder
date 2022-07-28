import "./MultiRangeSlider.css";

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
        min="1"
        max="6"
        step="1"
        value={min}
        onChange={handleMinChange}
        className="thumb thumb--zindex-3"
      />
      <input
        type="range"
        min="1"
        max="6"
        step="1"
        value={max}
        onChange={handleMaxChange}
        className="thumb thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div className="slider__range" />
      </div>
      <p>
        {name} of {min} to {max}
      </p>
    </div>
  );
};

export default MultiRangeSlider;
