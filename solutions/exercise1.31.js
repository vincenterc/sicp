import { display } from "sicp";
import { identity, inc, is_even } from "./utils.js";

function product(term, a, next, b) {
  return a > b ? 1 : term(a) * product(term, next(a), next, b);
}

function factorial(n) {
  return product(identity, 1, inc, n);
}

function pi_product(a, b) {
  function pi_term(x) {
    return ((2 * x) / (2 * x + 1)) * ((2 * x + 2) / (2 * x + 1));
    // return is_even(x) ? (x + 2) / (x + 1) : (x + 1) / (x + 2);
  }

  return product(pi_term, a, inc, b);
}

display(factorial(5));
// 120

display(4 * pi_product(1, 1000));
// 3.142377365093871

function product_iter(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), term(a) * result);
  }

  return iter(a, 1);
}

function factorial_iter(n) {
  return product_iter(identity, 1, inc, n);
}

display(factorial_iter(5));
// 120
