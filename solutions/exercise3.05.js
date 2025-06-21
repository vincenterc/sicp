import { display, math_random } from "sicp";
import { square } from "./math.js";

function estimate_integral(
  predicate,
  upper_x,
  upper_y,
  lower_x,
  lower_y,
  n_trials,
) {
  const area_rect = (upper_x - lower_x) * (upper_y - lower_y);

  function experiment() {
    return predicate(
      random_in_range(lower_x, upper_x),
      random_in_range(lower_y, upper_y),
    );
  }

  return monte_carlo(n_trials, experiment) * area_rect;
}

function monte_carlo(trials, experiment) {
  function iter(trials_remaining, trials_passed) {
    return trials_remaining === 0
      ? trials_passed / trials
      : experiment()
        ? iter(trials_remaining - 1, trials_passed + 1)
        : iter(trials_remaining - 1, trials_passed);
  }

  return iter(trials, 0);
}

function random_in_range(low, high) {
  const range = high - low;
  return low + math_random() * range;
}

function unit_circle_test(x, y) {
  return square(x) + square(y) <= 1;
}

display(estimate_integral(unit_circle_test, 1, 1, -1, -1, 8000));
// 3.1445

export { estimate_integral, unit_circle_test };
