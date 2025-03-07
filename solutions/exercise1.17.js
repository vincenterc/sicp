import { is_even } from './utils.js';

function fast_times(a, b) {
  return b === 0
    ? 0
    : is_even(b)
    ? double(fast_times(a, halve(b)))
    : a + fast_times(a, b - 1);
}

function double(x) {
  return x + x;
}

function halve(x) {
  return x / 2;
}
