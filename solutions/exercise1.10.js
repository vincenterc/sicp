import { display } from "sicp";

function A(x, y) {
  return y === 0 ? 0 : x === 0 ? 2 * y : y === 1 ? 2 : A(x - 1, A(x, y - 1));
}

display(A(1, 10));
// == 1024

display(A(2, 4));
// == 65536

display(A(3, 3));
// == 65536

function f(n) {
  return A(0, n);
}

function g(n) {
  return A(1, n);
}

function h(n) {
  return A(2, n);
}

// f(n)
// == A(0, n)
// == 2 * n

// g(n)
// == A(1, n)
// == A(0, A(1, n - 1))
// == 2 * A(1, n - 1)
// == 2 * A(0, A(1, n - 2))
// == 2 * 2 * A(1, n - 2)
// == ...
// == 2^(n - 1) * A(1, 1)
// == 2^(n - 1) * 2
// == 2^n

// h(n)
// == A(2, n)
// == A(1, A(2, n - 1))
// == g(A(2, n - 1))
// == 2^A(2, n - 1)
// == 2^(2^(A(2, n - 2)))
// == 2^(2^2^(...2))
// the number of 2s is n
