import { head, pair, stream_tail } from "sicp";
import { add_streams } from "./stream.js";

function partial_sums(s) {
  return pair(head(s), () => add_streams(partial_sums(s), stream_tail(s)));
}

export { partial_sums };
