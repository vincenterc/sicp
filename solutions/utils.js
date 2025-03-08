function abs(x) {
  return x >= 0 ? x : -x;
}

function cube(x) {
  return x * x * x;
}

function identity(x) {
  return x;
}

function inc(k) {
  return k + 1;
}

function is_even(n) {
  return n % 2 === 0;
}

function multiply(x, y) {
  return x * y;
}

function plus(x, y) {
  return x + y;
}

function square(x) {
  return x * x;
}

export { abs, cube, identity, inc, is_even, multiply, plus, square };
