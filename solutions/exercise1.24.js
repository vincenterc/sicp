import { display, get_time, math_floor, math_random } from 'sicp';
import { is_even, square } from './math.js';

function timed_prime_test(n) {
  display(n);
  return start_prime_test(n, get_time());
}

const number_of_random_numbers = 10;

function start_prime_test(n, start_time) {
  return fast_is_prime(n, number_of_random_numbers)
    ? report_prime(get_time() - start_time)
    : false;
}

function report_prime(elapsed_time) {
  display(' *** ');
  display(elapsed_time);
  return true;
}

function fast_is_prime(n, times) {
  return times === 0
    ? true
    : fermat_test(n)
    ? fast_is_prime(n, times - 1)
    : false;
}

function fermat_test(n) {
  function try_it(a) {
    return expmod(a, n, n) === a;
  }
  return try_it(1 + math_floor(math_random() * (n - 1)));
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m;
}

timed_prime_test(1009);
// 0

timed_prime_test(1008);
// 0

timed_prime_test(1013);
// 0

timed_prime_test(1019);
// 0

timed_prime_test(10007);
// 0

timed_prime_test(10009);
// 0

timed_prime_test(10037);
// 0

timed_prime_test(100003);
// 0

timed_prime_test(100019);
// 0

timed_prime_test(100043);
// 0

timed_prime_test(1000003);
// 0

timed_prime_test(1000033);
// 0

timed_prime_test(1000037);
// 0
