import { head, pair, stream } from "sicp";
import { cycle_stream, stream_tail } from "./stream.js";

const sense_data = stream(1, 2, 1.5, 1, 0.5, -0.1, -2, -3, -2, -0.5, 0.2, 3, 4);
const infinite_sense_data = cycle_stream(sense_data);
const zero_crossings = make_zero_crossings(infinite_sense_data, 0, 0);

function make_zero_crossings(input_stream, last_value, last_avpt) {
  const value = head(input_stream);
  const avpt = (value + last_value) / 2;

  return pair(sign_change_detector(avpt, last_avpt), () =>
    make_zero_crossings(stream_tail(input_stream), value, avpt)
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
