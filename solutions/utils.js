function abs(x) {
  return x >= 0 ? x : -x;
}

function is_even(n) {
  return n % 2 === 0;
}

function square(x) {
  return x * x;
}

export { abs, is_even, square };
