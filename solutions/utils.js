function abs(x) {
  return x >= 0 ? x : -x;
}

function average(x, y) {
  return (x + y) / 2;
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

export { abs, average, cube, identity, inc, is_even, multiply, plus, square };
