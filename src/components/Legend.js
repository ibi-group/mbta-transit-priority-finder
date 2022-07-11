import classes from "./Legend.module.css";
import { grades } from "../globals";

const Legend = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["inner-container"]}>
        <svg height="20" width="60">
          <circle
            cx="30"
            cy="10"
            r="5"
            fill="white"
            stroke="lightgrey"
          ></circle>
        </svg>
        <p>Transit Stop</p>
      </div>
      <div className={classes["inner-container"]}>
        <svg height="50" width="60">
          <line
            x1="10"
            x2="50"
            y1="10"
            y2="10"
            stroke="white"
            strokeWidth="3"
            className={classes["solid-line"]}
          ></line>
          <line
            x1="10"
            x2="50"
            y1="30"
            y2="30"
            stroke="white"
            strokeDasharray="5px 3px"
            strokeWidth="3"
            className={classes["dashed-line"]}
          ></line>
        </svg>
        <p>Line type denotes each side of the street</p>
      </div>
      <div>
        {props.colors.map((color, index) => {
          return (
            <div className={classes["square-container"]}>
              <div
                className={classes.square}
                key={color}
                style={{ backgroundColor: color }}
              >
                <p className={classes.label}>{grades[index]}</p>
              </div>
              <p>Text Description</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
