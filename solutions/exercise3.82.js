import { display, head, math_random, pair, tail } from "sicp";
import { square } from "./math.js";
import { stream_map, stream_ref, stream_tail } from "./stream.js";

const pi_stream = estimate_integral(unit_circle_test, 1, 1, -1, -1);

function estimate_integral(predicate, upper_x, upper_y, lower_x, lower_y) {
  const area_rect = (upper_x - lower_x) * (upper_y - lower_y);
  const random_pairs = make_random_pairs();
  const dirichlet_stream = stream_map(
    (p) => predicate(head(p), tail(p)),
    random_pairs,
  );

  function make_random_pairs() {
    return pair(
      pair(
        random_in_range(lower_x, upper_x),
        random_in_range(lower_y, upper_y),
      ),
      () => make_random_pairs(),
    );
  }

  return stream_map((p) => p * area_rect, monte_carlo(dirichlet_stream, 0, 0));
}

function monte_carlo(experiment_stream, passed, failed) {
  function next(passed, failed) {
    return pair(passed / (passed + failed), () =>
      monte_carlo(stream_tail(experiment_stream), passed, failed),
    );
  }
  return head(experiment_stream)
    ? next(passed + 1, failed)
    : next(passed, failed + 1);
}

function unit_circle_test(x, y) {
  return square(x) + square(y) <= 1;
}

function random_in_range(low, high) {
  const range = high - low;
  return low + math_random() * range;
}

display(stream_ref(pi_stream, 8000));
// 3.1286089238845145

export { pi_stream };
