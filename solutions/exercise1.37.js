import { display } from "sicp";

function con_frac(n, d, k) {
  function rec(i) {
    return i === k ? n(i) / d(i) : n(i) / (d(i) + rec(i + 1));
  }

  return rec(1);
}

display(
  con_frac(
    (i) => 1,
    (i) => 1,
    11,
  ),
);
// 0.6180555555555556
// expect 0.61803

function con_frac_iter(n, d, k) {
  function iter(i, result) {
    return i === 0 ? result : iter(i - 1, n(i) / (d(i) + result));
  }

  return iter(k, 0);
}

display(
  con_frac_iter(
    (i) => 1,
    (i) => 1,
    11,
  ),
);
// 0.6180555555555556
