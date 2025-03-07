import { display, get_time } from 'sicp';
import { is_even, square } from './utils.js';

function search_for_primes(n, count) {
  return count === 0
    ? true
    : is_even(n)
    ? search_for_primes(n + 1, count)
    : timed_prime_test(n)
    ? search_for_primes(n + 2, count - 1)
    : search_for_primes(n + 2, count);
}

function timed_prime_test(n) {
  display(n);
  return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
  return is_prime(n) ? report_prime(get_time() - start_time) : false;
}

function report_prime(elapsed_time) {
  display(' *** ');
  display(elapsed_time);
  return true;
}

function is_prime(n) {
  return n === smallest_divisor(n);
}

function smallest_divisor(n) {
  return find_divisor(n, 2);
}

function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
    ? n
    : divides(test_divisor, n)
    ? test_divisor
    : find_divisor(n, test_divisor + 1);
}

function divides(a, b) {
  return b % a === 0;
}

search_for_primes(1000, 3);
// 1009...0
// 1013...0
// 1019...0

search_for_primes(10000, 3);
// 10007...0
// 10009...0
// 10037...0

search_for_primes(100000, 3);
// 100003...0
// 100019...0
// 100043...0

search_for_primes(1000000, 3);
// 1000003...0
// 1000033...0
// 1000037...0

search_for_primes(10000000, 3);
// 10000019...0
// 10000079...0
// 10000103...0

search_for_primes(100000000, 3);
// 100000007...1
// 100000037...0
// 100000039...0
