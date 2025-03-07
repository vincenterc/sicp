import { display } from 'sicp';

function f_recur(n) {
  return n < 3 ? n : f_recur(n - 1) + 2 * f_recur(n - 2) + 3 * f_recur(n - 3);
}

function f_iter(n) {
  function iter(a, b, c, count) {
    return count === 0 ? c : iter(a + 2 * b + 3 * c, a, b, count - 1);
  }

  return iter(2, 1, 0, n);
}
// function f_iter(n) {
//   function iter(a, b, c, count) {
//     return count === 0 ? a : iter(a + 2 * b + 3 * c, a, b, count - 1);
//   }

//   return n < 3 ? n : iter(2, 1, 0, n - 2);
// }

display(f_recur(0));
// 0
display(f_iter(0));
// 0

display(f_recur(1));
// 1
display(f_iter(1));
// 1

display(f_recur(2));
// 2
display(f_iter(2));
// 2

display(f_recur(5));
// 25
display(f_iter(5));
// 25

display(f_recur(10));
// 1892
display(f_iter(10));
// 1892
