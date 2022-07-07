import classes from "./Legend.module.css";
import { grades } from "../globals";

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
            <p className={classes.label}>{grades[index]}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Legend;
