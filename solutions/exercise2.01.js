import { display, math_abs, math_sign, pair } from "sicp";

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function make_rat(n, d) {
  const g = gcd(n, d);

  return pair(math_sign(n) * math_sign(d) * math_abs(n / g), math_abs(d / g));
}

display(make_rat(8, 12));
// [2, 3]
display(make_rat(-8, 12));
// [-2, 3]
display(make_rat(8, -12));
// [-2, 3]
display(make_rat(-8, -12));
// [2, 3]
