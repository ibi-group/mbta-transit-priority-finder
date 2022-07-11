import classes from "./Explainer.module.css";
import { Fragment, useState } from "react";

const Explainer = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [metric, setMetric] = useState("Frequency");

  const metrics = [
    "Frequency",
    "Excess Passenger Time",
    "Travel Time",
    "Travel Time Variability",
  ];

  const toggleModal = () => {
    setCollapsed((state) => !state);
  };

  const selectMetric = (event) => {
    setMetric(event.target.value);
  };

  const frequencyInfo = (
    <div className={classes["text-container"]}>
      <h3>All-Day Volume</h3>
      <p>
        Total number of buses traveling both directions on this segment, on any
        route, throughout the day
      </p>
      <h3>Max Hourly Frequency</h3>
      <p>Number of buses observed in the single busiest hour of the day</p>
    </div>
  );

  return (
    <Fragment>
      <div
        onClick={() => setCollapsed(true)}
        className={classes[collapsed ? "" : "modal-background"]}
      ></div>
      <div className={classes[collapsed ? "container-collapsed" : "container"]}>
        <button className={classes.button} onClick={toggleModal}>
          <span class="material-symbols-outlined">help</span>
        </button>
        <p>How we calculated these metrics</p>
        {!collapsed && (
          <div>
            {metrics.map((m) => (
              <button
                className={
                  classes[metric === m ? "metric-btn-active" : "metric-btn"]
                }
                onClick={selectMetric}
                value={m}
              >
                {m}
              </button>
            ))}
          </div>
        )}
        <div>
          {metric === "Frequency" && !collapsed && frequencyInfo}
          {metric === "Excess Passenger Time" && !collapsed && <p>XPT Info</p>}
          {metric === "Travel Time" && !collapsed && <p>Travel Time Info</p>}
          {metric === "Travel Time Variability" && !collapsed && (
            <p>Variability Info</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Explainer;
