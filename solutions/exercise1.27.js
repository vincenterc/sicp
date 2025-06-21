import { display } from "sicp";
import { is_even, square } from "./math.js";

function carmichael(n) {
  return fermat_test(n - 1, n);
}

function fermat_test(a, n) {
  return a === 1 ? true : expmod(a, n, n) === a ? fermat_test(a - 1, n) : false;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
      ? square(expmod(base, exp / 2, m)) % m
      : (base * expmod(base, exp - 1, m)) % m;
}

display(carmichael(561));
// true

display(carmichael(1105));
// true

display(carmichael(1729));
// true

display(carmichael(2465));
// true

display(carmichael(2821));
// true

display(carmichael(6601));
// true
