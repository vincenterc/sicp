import { is_even } from './utils.js';

function fast_times(a, b) {
  return fast_times_iter(a, b, 0);
}

function fast_times_iter(a, b, sum) {
  return b === 0
    ? sum
    : is_even(b)
    ? fast_times_iter(double(a), halve(b), sum)
    : fast_times_iter(a, b - 1, a + sum);
}

function double(x) {
  return x + x;
}

function halve(x) {
  return x / 2;
}
