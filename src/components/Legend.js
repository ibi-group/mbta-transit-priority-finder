import classes from "./Legend.module.css";

const Legend = (props) => {
  const labels = [];
  for (let i = 0; i < props.breaks.length - 1; i++) {
    labels.push(`${props.breaks[i]} to ${props.breaks[i + 1]}`);
  }

  return (
    <div className={classes.container}>
      {props.colors.map((color, index) => {
        return (
          <div
            className={classes.square}
            key={color}
            style={{ backgroundColor: color }}
          >
            <p className={classes.label}>{labels[index]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Legend;
