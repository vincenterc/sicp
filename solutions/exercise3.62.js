import { head } from "sicp";
import { invert_unit_series, mul_series } from "./stream.js";
import { cosine_series, sine_series } from "./exercise3.59.js";

function div_series(s1, s2) {
  if (head(s2) === 0) {
    error(s2, "the denominator has a zero constant term -- div_series");
  } else {
    return mul_series(s1, invert_unit_series(s2));
  }
}

const tangent_series = div_series(sine_series, cosine_series);

export { tangent_series };
