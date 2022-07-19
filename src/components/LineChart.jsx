import React from "react";
import { Chart } from "react-google-charts";

export function LineChart({ arr1, arr2 }) {
  console.log({ arr1, arr2 });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const data = [
    ["Day", "Data Consumption (GB)", "Prediction (GB)"],
    [-7, null, 0],
    ...days.map((day, i) => [i - 6, parseFloat(arr1[i]), null]),
    [0, null, parseFloat(arr1[6])],
    ...days.map((day, i) => [i + 1, null, parseFloat(arr2[i])]),
    [7, 0, null],
    [8, 0, null],
  ];
  const data1 = [
    ["Day", "Data Consumption (GB)", "Prediction (GB)"],
    [0, null, parseFloat(arr1[6])],

    ...days.map((day, i) => [i + 1, parseFloat(arr1[i]), null]),
  ];

  console.log({ data, arr1, arr2 });

  const options = {
    title: "Cloud Storage Consumption",
    curveType: "function",
    legend: { position: "bottom" },
  };
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={arr2[0] ? data : data1}
      options={options}
    />
  );
}
