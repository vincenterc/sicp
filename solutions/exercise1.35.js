import { display } from 'sicp';
import { abs } from './utils.js';

const tolerance = 0.00001;

function fixed_point(f, first_guess) {
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }

  function try_with(guess) {
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }

  return try_with(first_guess);
}

// The golden ratio satisfies the equation
// x^2 = x + 1
// => x = 1 + 1 / x

display(fixed_point((x) => 1 + 1 / x, 1));
// 1.6180327868852458
