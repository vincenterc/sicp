import { identity, inc, times, plus, square } from './utils.js';

function filtered_accumulate(combiner, null_value, term, a, next, b, filter) {
  return a > b
    ? null_value
    : filter(a)
    ? combiner(
        term(a),
        filtered_accumulate(
          combiner,
          null_value,
          term,
          next(a),
          next,
          b,
          filter,
        ),
      )
    : filtered_accumulate(combiner, null_value, term, next(a), next, b, filter);
}

function sum_square_prime(a, b) {
  return filtered_accumulate(plus, 0, square, a, inc, b, is_prime);
}

function product_relative_prime(n) {
  function is_relative_prime(i) {
    return gcd(i, n) === 1;
  }

  return filtered_accumulate(
    times,
    1,
    identity,
    1,
    inc,
    n - 1,
    is_relative_prime,
  );
}
