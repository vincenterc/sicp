import { display } from "sicp";
import { inc } from "./math.js";

const zero = (f) => (x) => x;

function add_1(n) {
  return (f) => (x) => f(n(f)(x));
}

// add_1(zero)
// == (f => x => f((g => y => y)(f)(x)))
// == (f => x => f(x))

const one = (f) => (x) => f(x);

// add_1(one)
// == (f => x => f((g => y => g(y))(f)(x)))
// == (f => x => f(f(x)))

const two = (f) => (x) => f(f(x));

function plus(n, m) {
  return (f) => (x) => m(f)(n(f)(x));
}

display(one(inc)(0));
// 1

display(two(inc)(0));
// 2

display(plus(one, two)(inc)(0));
// 3
