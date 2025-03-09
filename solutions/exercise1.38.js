import { display } from 'sicp';

function con_frac(n, d, k) {
  function rec(i) {
    return i === k ? n(i) / d(i) : n(i) / (d(i) + rec(i + 1));
  }

  return rec(1);
}

display(
  con_frac(
    (i) => 1,
    (i) => (i % 3 === 2 ? 2 * ((i + 1) / 3) : 1),
    9,
  ),
);
// 0.7182835820895522
