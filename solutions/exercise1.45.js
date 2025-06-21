import { display, math_abs, math_floor, math_log2 } from 'sicp';
import { average, is_even, square } from './math.js';

const tolerance = 0.00001;

function fixed_point(f, first_guess) {
  function close_enough(x, y) {
    return math_abs(x - y) < tolerance;
  }

  function try_with(guess) {
    const next = f(guess);
    return close_enough(guess, next) ? next : try_with(next);
  }

  return try_with(first_guess);
}

function average_damp(f) {
  return (x) => average(x, f(x));
}

function compose(f, g) {
  return (x) => f(g(x));
}

function repeated(f, n) {
  return n === 1 ? f : compose(f, repeated(f, n - 1));
}

// display(
//   fixed_point(
//     repeated(average_damp, 5)((y) => 4294967296 / y ** 31),
//     1,
//   ),
// );
// nth_roots  number_of_average_damps
//         2                        1
//         3                        1
//         4                        2
//         5                        2
//         6                        2
//         7                        2
//         8                        3
//        15                        3
//        16                        4
//        31                        4
//        32                        5
// floor(log2(n)) average damps are required to compute nth roots

function fast_expt(b, n) {
  return n === 0
    ? 1
    : is_even(n)
    ? square(fast_expt(b, n / 2))
    : b * fast_expt(b, n - 1);
}

// Assume n >= 2
function nth_roots(n, x) {
  return fixed_point(
    repeated(
      average_damp,
      math_floor(math_log2(n)),
    )((y) => x / fast_expt(y, n - 1)),
    1,
  );
}

display(nth_roots(2, 9));
// 3

display(nth_roots(3, 27));
// 2.9999972321057697

display(nth_roots(4, 10000));
// 10
