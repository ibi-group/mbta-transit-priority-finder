import { scale } from "chroma-js";

export const grades = ["A", "B", "C", "D", "E", "F"];

export const initialWeights = { w1: 1, w2: 1, w3: 1, w4: 1, w5: 0 };

export const colors = scale(["#1F91AD", "#FFB35C"]).colors(6);

export const sharedCols = {
  merge19: "merge2019",
  merge21: "merge2021",
  freq_score: "freq_score",
  all_day_vol: "frequency",
  side: "side",
  max_freq: "max_freq",
};

export const cols2021 = [
  "time_variability",
  "xpt21",
  "travel_time",
  "OM_score21",
];

export const cols2019 = [
  "time_variability2019",
  "xpt19",
  "travel_time2019",
  "OM_score19",
];
