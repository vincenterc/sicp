import { integers_from, pair } from "sicp";
import { stream_map_2 } from "./stream.js";

function mul_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 * x2, s1, s2);
}

const factorials = pair(1, () => mul_streams(factorials, integers_from(2)));

export { factorials };
