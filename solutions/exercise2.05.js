import { display } from "sicp";

function pair(x, y) {
  return 2 ** x * 3 ** y;
}

function head(p) {
  function iter(n, count) {
    return n % 2 === 0 ? iter(n / 2, count + 1) : count;
  }

  return iter(p, 0);
}

function tail(p) {
  function iter(n, count) {
    return n % 3 === 0 ? iter(n / 3, count + 1) : count;
  }

  return iter(p, 0);
}

display(pair(4, 3));
// 432

display(head(pair(4, 3)));
// 4

display(tail(pair(4, 3)));
// 3
