import { VerticalRectSeries, XYPlot, XAxis } from "react-vis/dist";

const Chart = ({ data }) => {
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
      return { x0: edge[0], x: edge[1], y: bins[index] };
    });

    return data;
  }

  const chartData = histogram(data, 1);

  return (
    <div>
      <XYPlot height={250} width={300}>
        <XAxis
          style={{ stroke: "#FFFFFF", fontSize: "12px" }}
          tickValues={[
            ...chartData.map((d) => d.x),
            chartData[chartData.length - 1].x0,
          ]}
        />
        <VerticalRectSeries
          animation
          stroke="#121212"
          data={chartData}
        ></VerticalRectSeries>
      </XYPlot>
    </div>
  );
};

export default Chart;
