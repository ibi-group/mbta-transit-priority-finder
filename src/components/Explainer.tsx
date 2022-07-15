import classes from "./Explainer.module.css";
import { Fragment, useState } from "react";
import TextBlock from "./TextBlock";
//@ts-ignore
import frequencyLink from "../Descriptions/Frequency.md";
//@ts-ignore
import xptLink from "../Descriptions/Xpt.md";
//@ts-ignore
import variabilityLink from "../Descriptions/Variability.md";
//@ts-ignore
import travelTimeLink from "../Descriptions/TravelTime.md";
//@ts-ignore
import omLink from "../Descriptions/OM.md";

enum Metrics {
  Frequency = "Frequency",
  XPT = "Excess Passenger Time",
  TravelTime = "Travel Time",
  TravelVariability = "Travel Time Variability",
  omCost = "Operations + Maintenence",
}

const Explainer = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [metric, setMetric] = useState(Metrics.Frequency);

  const metrics = [
    Metrics.Frequency,
    Metrics.XPT,
    Metrics.TravelTime,
    Metrics.TravelVariability,
    Metrics.omCost,
  ];

  const toggleModal = () => {
    setCollapsed((state) => !state);
  };

  const selectMetric = (event: any) => {
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
          <span className="material-symbols-outlined">help</span>
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

            <TextBlock
              name={Metrics.Frequency}
              metric={metric}
              path={frequencyLink}
              collapsed={collapsed}
            />
            <TextBlock
              name={Metrics.XPT}
              metric={metric}
              path={xptLink}
              collapsed={collapsed}
            />
            <TextBlock
              name={Metrics.TravelTime}
              metric={metric}
              path={travelTimeLink}
              collapsed={collapsed}
            />
            <TextBlock
              name={Metrics.TravelVariability}
              metric={metric}
              path={variabilityLink}
              collapsed={collapsed}
            />
            <TextBlock
              name={Metrics.omCost}
              metric={metric}
              path={omLink}
              collapsed={collapsed}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Explainer;
