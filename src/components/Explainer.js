import classes from "./Explainer.module.css";
import { Fragment, useState } from "react";
import frequencyLink from "../Descriptions/Frequency.md";
import xptLink from "../Descriptions/Xpt.md";
import variabilityLink from "../Descriptions/Variability.md";
import travelTimeLink from "../Descriptions/TravelTime.md";
import TextBlock from "./TextBlock";

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
        <div className={classes["text-container"]}>
          <TextBlock
            name="Frequency"
            metric={metric}
            path={frequencyLink}
            collapsed={collapsed}
          />
          <TextBlock
            name="Excess Passenger Time"
            metric={metric}
            path={xptLink}
            collapsed={collapsed}
          />
          <TextBlock
            name="Travel Time"
            metric={metric}
            path={travelTimeLink}
            collapsed={collapsed}
          />
          <TextBlock
            name="Travel Time Variability"
            metric={metric}
            path={variabilityLink}
            collapsed={collapsed}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Explainer;
