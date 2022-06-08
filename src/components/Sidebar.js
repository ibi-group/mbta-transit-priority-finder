import classes from "./Sidebar.module.css";

const Sidebar = (props) => {
  return (
    <div className={classes.Sidebar}>
      <h2>Settings</h2>
      <button onClick={() => props.changeFrequency()}>{props.variable}</button>
    </div>
  );
};

export default Sidebar;
