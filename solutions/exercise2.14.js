import { display, head, math_max, math_min, pair, tail } from "sicp";

function make_interval(x, y) {
  return pair(x, y);
}

function upper_bound(i) {
  return tail(i);
}

function lower_bound(i) {
  return head(i);
}

function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4));
}

function div_interval(x, y) {
  return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}

function center(i) {
  return (lower_bound(i) + upper_bound(i)) / 2;
}
function width(i) {
  return (upper_bound(i) - lower_bound(i)) / 2;
}

function percent(i) {
  return (width(i) / center(i)) * 100;
}

const A = make_interval(1.8, 2.2);
const B = make_interval(0.95, 1.05);
const A_div_A = div_interval(A, A);
const A_div_B = div_interval(A, B);

display(A_div_A);
display(center(A_div_A));
display(percent(A_div_A));
// A / A
// == [0.8181818181818181, 1.2222222222222223]
// == [1.0202020202020203, 19.80198019801981] ([center, percent])
// but expect [1, 0]

display(A_div_B);
display(center(A_div_B));
display(percent(A_div_B));
// A / B
// == [1.7142857142857142, 2.3157894736842106]
// == [2.0150375939849625, 14.925373134328362] ([center, percent])
