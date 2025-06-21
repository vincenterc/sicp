import { pair, stream } from "sicp";
import { stream_map_2 } from "./stream.js";

const sense_data = stream(1, 2, 1.5, 1, 0.5, -0.1, -2, -3, -2, -0.5, 0.5, 3, 4);

const zero_crossings = stream_map_2(
  sign_change_detector,
  sense_data,
  pair(0, () => sense_data),
);

function sign_change_detector(value, last_value) {
  return value >= 0 && last_value < 0
    ? 1
    : value < 0 && last_value >= 0
      ? -1
      : 0;
}

export { zero_crossings };
