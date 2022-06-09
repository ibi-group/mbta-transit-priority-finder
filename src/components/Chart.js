import { VerticalRectSeries, XYPlot, XAxis, YAxis } from "react-vis/dist";
import SliderInput from "./Slider";
import { useState } from "react";

const Chart = ({ data }) => {
  const [binWidth, setBinWidth] = useState({ x: 5 });

  function histogram(X, binRange) {
    //inclusive of the first number
    let max = Math.max(...X);
    let min = Math.min(...X);
    let len = max - min + 1;

    let edges = [];
    for (let i = min; i < max; i += binRange) {
      edges.push([i, i + binRange]);
    }

    let numberOfBins = Math.ceil(len / binRange);
    let bins = new Array(numberOfBins).fill(0);
    //-min to normalise values for the array
    X.forEach((x) => bins[Math.floor((x - min) / binRange)]++);

    const data = edges.map((edge, index) => {
      return { x: edge[0], x0: edge[1], y: 0, y0: bins[index] };
    });

    return data;
  }

  const chartData = histogram(data, binWidth.x);

  return (
    <div>
      <XYPlot height={250} width={400}>
        <VerticalRectSeries
          animation
          stroke="#121212"
          data={chartData}
        ></VerticalRectSeries>
        <XAxis />
        <YAxis />
      </XYPlot>
      <SliderInput range={[5, 20]} state={binWidth} setState={setBinWidth} />
    </div>
  );
};

export default Chart;
