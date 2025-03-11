import { display, math_abs, math_cos, math_sin } from 'sicp';
import { average, square } from './utils.js';

function iterative_improve(is_good_enough, improve) {
  function try_with(guess) {
    const next = improve(guess);
    return is_good_enough(guess, next) ? next : try_with(next);
  }

  return (guess) => try_with(guess);
}

function close_enough(x, y) {
  return;
}

function sqrt(x) {
  return iterative_improve(
    (guess, next) => math_abs(square(next) - x) < 0.001,
    (guess) => average(guess, x / guess),
  )(1);
}

display(sqrt(9));
// 3.00009155413138

display(sqrt(100 + 37));
// 11.704699917758145

const tolerance = 0.00001;

function fixed_point(f, first_guess) {
  return iterative_improve(
    (x, y) => math_abs(x - y) < tolerance,
    f,
  )(first_guess);
}

display(fixed_point(math_cos, 1));
// 0.7390822985224023

display(fixed_point((y) => math_sin(y) + math_cos(y), 1));
// 1.2587315962971173

function sqrt_fixed_point(x) {
  return fixed_point((y) => average(y, x / y), 1);
}

display(sqrt_fixed_point(9));
// 3
