import classes from "./Legend.module.css";

const Legend = (props) => {
  const grades = ["1", "2", "3", "4", "5", "6"];

  return (
    <div className={classes.container}>
      {props.colors.map((color, index) => {
        return (
          <div
            className={classes.square}
            key={color}
            style={{ backgroundColor: color }}
          >
            <p className={classes.label}>{grades[index]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Legend;
