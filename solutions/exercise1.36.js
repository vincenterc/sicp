import { display, math_abs, math_log } from 'sicp';
import { average } from './utils.js';

const tolerance = 0.00001;

function fixed_point(f, first_guess) {
  function close_enough(x, y) {
    return math_abs(x - y) < tolerance;
  }

  function try_with(guess) {
    const next = f(guess);
    display(next);
    return close_enough(guess, next) ? next : try_with(next);
  }

  return try_with(first_guess);
}

fixed_point((x) => math_log(1000) / math_log(x), 2);
// 4.555532270803653
// 34 steps

fixed_point((x) => average(x, math_log(1000) / math_log(x)), 2);
// 4.555537551999825
// 9 steps
