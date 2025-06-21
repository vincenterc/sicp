import { head, math_abs, pair } from "sicp";
import { average } from "./math.js";
import { stream_map, stream_tail } from "./stream.js";

function stream_limit(s, tolerance) {
  const first_item = head(s);
  const first_tail = stream_tail(s);
  const second_item = head(first_tail);

  return math_abs(first_item - second_item) < tolerance
    ? second_item
    : stream_limit(first_tail, tolerance);
}

function sqrt(x, tolerance) {
  return stream_limit(sqrt_stream(x), tolerance);
}

function sqrt_stream(x) {
  return pair(1, () =>
    stream_map((guess) => sqrt_improve(guess, x), sqrt_stream(x)),
  );
}

function sqrt_improve(guess, x) {
  return average(guess, x / guess);
}

export { sqrt };
