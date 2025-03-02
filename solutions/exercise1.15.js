function abs(x) {
  return x >= 0 ? x : -x;
}

function cube(x) {
  return x * x * x;
}

function p(x) {
  return 3 * x - 4 * cube(x);
}

function sine(angle) {
  return !(abs(angle) > 0.1) ? angle : p(sine(angle / 3));
}

// sine(12.15)
// == p(sine(4.05))
// == p(p(sine(1.35)))
// == p(p(p(sine(0.45))))
// == p(p(p(p(sine(0.15)))))
// == p(p(p(p(p(sine(0.05))))))
// The function p applied 5 times.

// a/3^n < 0.1
// == a / 0.1 < 3^n
// == 10 * a < 3^n
// == log(10 * a) < log(3^n)
// == log(10) + log(a) < n * log(3)
// == n > (log(10) + log(a)) / log(3)
// The order of growth in space and number of steps is O(log(a)).
