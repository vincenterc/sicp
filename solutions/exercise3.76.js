import { pair, stream } from "sicp";
import { average } from "./math.js";
import { cycle_stream, stream_map_2 } from "./stream.js";

const sense_data = stream(1, 2, 1.5, 1, 0.5, -0.1, -2, -3, -2, -0.5, 0.2, 3, 4);
const infinite_sense_data = cycle_stream(sense_data);
const zero_crossings = make_zero_crossings(infinite_sense_data, 0, 0);

function make_zero_crossings(input_stream, last_value, last_avpt) {
  const smoothed_stream = smooth(input_stream, last_value);

  return stream_map_2(
    sign_change_detector,
    smoothed_stream,
    pair(last_avpt, () => smoothed_stream)
  );
}

function smooth(s, last_value) {
  return stream_map_2(
    average,
    s,
    pair(last_value, () => s)
  );
}

function sign_change_detector(value, last_value) {
  return value >= 0 && last_value < 0
    ? 1
    : value < 0 && last_value >= 0
    ? -1
    : 0;
}

export { zero_crossings };
