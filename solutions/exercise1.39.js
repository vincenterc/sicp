import { display, math_PI, math_tan } from "sicp";

function con_frac(n, d, k) {
  function rec(i) {
    return i === k ? n(i) / d(i) : n(i) / (d(i) + rec(i + 1));
  }

  return rec(1);
}

function tan_cf(x, k) {
  return con_frac(
    (i) => (i === 1 ? x : -x * x),
    (i) => 2 * i - 1,
    k,
  );
}

display(tan_cf(math_PI / 4, 9));
// 1
display(math_tan(math_PI / 4));
// 0.9999999999999999

display(tan_cf(1, 9));
// 1.557407724654902
display(math_tan(1));
// 1.5574077246549023

display(tan_cf(2, 9));
// -2.185039863369829
display(math_tan(2));
// -2.185039863261519
