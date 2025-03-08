import { display } from 'sicp';
import { identity, inc, multiply, plus } from './utils.js';

function accumulate(combiner, null_value, term, a, next, b) {
  return a > b
    ? null_value
    : combiner(
        term(a),
        accumulate(combiner, null_value, term, next(a), next, b),
      );
}

function sum(term, a, next, b) {
  return accumulate(plus, 0, term, a, next, b);
}

function product(term, a, next, b) {
  return accumulate(multiply, 1, term, a, next, b);
}

function sum_integers(a, b) {
  return sum(identity, a, inc, b);
}

function factorial(n) {
  return product(identity, 1, inc, n);
}

display(sum_integers(1, 10));
// 55

display(factorial(5));
// 120

function accumulate_iter(combiner, null_value, term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), combiner(term(a), result));
  }

  return iter(a, null_value);
}

function sum_iter(term, a, next, b) {
  return accumulate_iter(plus, 0, term, a, next, b);
}

function product_iter(term, a, next, b) {
  return accumulate_iter(multiply, 1, term, a, next, b);
}

function sum_integers_iter(a, b) {
  return sum_iter(identity, a, inc, b);
}

function factorial_iter(n) {
  return product_iter(identity, 1, inc, n);
}

display(sum_integers_iter(1, 20));
// 210

display(factorial_iter(6));
// 720
