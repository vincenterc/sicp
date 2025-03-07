import { display, math_floor, math_random } from 'sicp';
import { is_even, square } from './utils.js';

function is_prime(n, times) {
  return times === 0
    ? true
    : miller_rabin_test(n)
    ? is_prime(n, times - 1)
    : false;
}

function miller_rabin_test(n) {
  function try_it(a) {
    return expmod(a, n - 1, n) === 1;
  }

  return try_it(1 + math_floor(math_random() * (n - 1)));
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
    ? nontrivial_sqrt_test(expmod(base, exp / 2, m), m)
    : (base * expmod(base, exp - 1, m)) % m;
}

function nontrivial_sqrt_test(r, m) {
  return r === 1 || r === m - 1
    ? square(r) % m
    : square(r) % m === 1
    ? 0
    : square(r) % m;
}

display(is_prime(71, 10));
// true

display(is_prime(561, 10));
// false

display(is_prime(1009, 10));
// true

display(is_prime(1105, 10));
// false

display(is_prime(1729, 10));
// false

display(is_prime(10007, 10));
// true
