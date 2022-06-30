import {
  VerticalBarSeries,
  XYPlot,
  XAxis,
  YAxis,
  LabelSeries,
} from "react-vis/dist";

const Chart = ({ data }) => {
  const counts = {};
  for (const num of data) {
    counts[num] = counts[num] ? (counts[num] += 1) : 1;
  }

  const grades = ["F", "E", "D", "C", "B", "A"];

  const chartData = Object.entries(counts).map(function ([key, value], index) {
    return { x: grades[index], y: value };
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
