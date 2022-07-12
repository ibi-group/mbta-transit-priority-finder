import { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import classes from "./Explainer.module.css";

function TextBlock({ name, path, metric, collapsed }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then((md) => setText(md));
  }, [path]);

  return (
    <Fragment>
      {metric === name && !collapsed && (
        <div className={classes["text-container"]}>
          <ReactMarkdown children={text} remarkPlugins={remarkGfm} />
        </div>
      )}
    </Fragment>
  );
}

export default TextBlock;
