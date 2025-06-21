import { display, get_time } from "sicp";
import { square } from "./math.js";

function timed_prime_test(n) {
  display(n);
  return start_prime_test(n, get_time());
}

function start_prime_test(n, start_time) {
  return is_prime(n) ? report_prime(get_time() - start_time) : false;
}

function report_prime(elapsed_time) {
  display(" *** ");
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
      : find_divisor(n, next(test_divisor));
}

function next(n) {
  return n === 2 ? 3 : n + 2;
}

function divides(a, b) {
  return b % a === 0;
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
