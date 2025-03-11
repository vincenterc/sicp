import { display, math_abs } from 'sicp';
import { average, square } from './utils.js';

function sqrt(x) {
  return sqrt_iter(1, x);
}

function sqrt_iter(guess, x) {
  return is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
}

function is_good_enough(guess, x) {
  return math_abs(square(guess) - x) < 0.001;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

display(sqrt(0.0001));
// 0.03230844833048122
// expected value 0.01

// display(sqrt(10000000000000));
// not terminate

const tolerance = 0.001;

function sqrt_v2(x) {
  return sqrt_iter_v2(1, x);
}

function sqrt_iter_v2(guess, x) {
  return is_good_enough_v2(guess, improve(guess, x))
    ? guess
    : sqrt_iter_v2(improve(guess, x), x);
}

function is_good_enough_v2(pre_guess, guess) {
  return math_abs(guess - pre_guess) / pre_guess < tolerance;
}

display(sqrt_v2(0.0001));
// 0.010000714038711746

display(sqrt_v2(10000000000000));
// 3162433.547242504
display(square(3162433.547242504));
// 10000985940724.807
