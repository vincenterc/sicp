import { is_even } from './utils.js';

function fast_expt(b, n) {
  return fast_expt_iter(b, n, 1);
}

function fast_expt_iter(base, count, product) {
  return count === 0
    ? product
    : is_even(count)
    ? fast_expt_iter(base * base, count / 2, product)
    : fast_expt_iter(base, count - 1, base * product);
}
