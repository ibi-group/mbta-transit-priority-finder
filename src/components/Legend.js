import classes from "./Legend.module.css";
import { grades } from "../globals";
import { useState } from "react";

const Legend = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const descriptions = [
    "Very Low",
    "Low",
    "Medium-Low",
    "Medium-High",
    "High",
    "Very High",
  ];

  return (
    <div className={classes.container}>
      <button
        className={classes["expand-btn"]}
        onClick={() => setCollapsed((state) => !state)}
      >
        <span class="material-symbols-outlined">
          {collapsed ? "open_in_full" : "close_fullscreen"}
        </span>
      </button>
      {!collapsed && (
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
      )}
      {!collapsed && (
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
      )}
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
              {!collapsed && <p>{descriptions[index]} Priority</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
