import { scale } from "chroma-js";

export const grades = ["A", "B", "C", "D", "E", "F"];

export const initialWeights = {
  freq: [1, 6],
  sb: [1, 6],
  travel: [1, 6],
};

export const colors = scale(["#1F91AD", "#FFB35C"]).colors(6);

export const sharedCols = {
  merge19: "merge2019",
  merge21: "merge2021",
  freq_score: "freq_score",
  all_day_vol: "frequency",
  side: "side",
  max_freq: "max_freq",
  new_road: "new_road",
  xpt: "xpt19",
  travel_time: "travel_time19",
  social_cost: "OM_score19",
};
