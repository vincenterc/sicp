import { pair, stream_tail } from "sicp";
import { mul_series, scale_stream } from "./stream.js";

function invert_unit_series(s) {
  return pair(1, () =>
    scale_stream(mul_series(stream_tail(s), invert_unit_series(s)), -1)
  );
}

export { invert_unit_series };
