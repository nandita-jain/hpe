import React from "react";
import { Chart } from "react-google-charts";

export function LineChart({ arr }) {
  const tempData = arr.map((val, i) => [i, parseInt(val)]);

  const data = [["Day", "Average hours of daylight"], ...tempData];

  const options = {
    chart: {
      title: "Title",
    },
    width: 900,
    height: 500,
    series: {
      // Gives each series an axis name that matches the Y-axis below.
      0: { axis: "Data" },
      1: { axis: "Day" },
    },
    axes: {
      // Adds labels to each axis; they don't have to match the axis names.
      y: {
        Data: { label: "Data" },
        Day: { label: "Day" },
      },
    },
  };

  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
