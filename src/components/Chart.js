import {
  VerticalBarSeries,
  XYPlot,
  XAxis,
  YAxis,
  LabelSeries,
} from "react-vis/dist";
import { grades, colors } from "../globals";

const Chart = ({ data }) => {
  const counts = {};
  const validData = data.filter((d) => d !== null);

  for (const num of validData) {
    counts[num] = counts[num] ? (counts[num] += 1) : 1;
  }

  const chartData = Object.entries(counts).map(function ([key, value]) {
    return { x: grades[key - 1], y: value, color: colors[key - 1] };
  });

  const labels = chartData.map((obj) => {
    return {
      ...obj,
      label: String(obj.y),
      yOffset: -10,
      style: { fill: "#FFF", fontSize: "12px", fontWeight: "bold" },
    };
  });

  return (
    <div style={{ paddingTop: "10px" }}>
      <XYPlot margin={{ top: 20 }} xType="ordinal" height={250} width={300}>
        <XAxis style={{ stroke: "#FFFFFF", fontSize: "12px" }} />
        <YAxis />
        <VerticalBarSeries
          animation
          stroke="#121212"
          data={chartData}
          colorType="literal"
        ></VerticalBarSeries>
        <LabelSeries
          data={labels}
          labelAnchorX="middle"
          labelAnchorY="middle"
        ></LabelSeries>
      </XYPlot>
    </div>
  );
};

export default Chart;
