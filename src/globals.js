import { scale } from "chroma-js";

export const initialWeights = {
  freq: [2, 4],
  sb: [0, 4],
  travel: [0, 4],
};

export const colors = scale(["#1F91AD", "#FFB35C"]).colors(6);

export const sharedCols = {
  merge: "merge2019",
  freq_score: "freq_score",
  all_day_vol: "frequency",
  side: "side",
  max_freq: "max_freq",
  new_road: "new_road",
  xpt: "xpt19",
  travel_time: "travel_time19",
  travel_time_var: "time_variability19",
  social_cost: "social_benefit_per_mile",
  social_cost_score: "social_score",
  pass_exp_score: "pass_exp_score",
};
