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
  new_road: "new_road",
};

export const cols2021 = [
  "time_variability21",
  "xpt21",
  "travel_time21",
  "OM_score21",
];

export const cols2019 = [
  "time_variability19",
  "xpt19",
  "travel_time19",
  "OM_score19",
];
