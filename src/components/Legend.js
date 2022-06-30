import classes from "./Legend.module.css";

const Legend = (props) => {
  return (
    <div className={classes.container}>
      {props.colors.map((color, index) => {
        return (
          <div
            className={classes.square}
            key={color}
            style={{ backgroundColor: color }}
          >
            <p className={classes.label}>{index + 1}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Legend;
