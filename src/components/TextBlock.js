import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function TextBlock({ name, path, metric, collapsed }) {
  const [text, setText] = useState(null);

  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then((md) => setText(md));
  }, []);

  return (
    <div>
      {metric === name && !collapsed && (
        <ReactMarkdown children={text} remarkPlugins={remarkGfm} />
      )}
    </div>
  );
}

export default TextBlock;
