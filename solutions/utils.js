function identity(x) {
  return x;
}

function inc(k) {
  return k + 1;
}

function plus(x, y) {
  return x + y;
}

function times(x, y) {
  return x * y;
}

function average(x, y) {
  return (x + y) / 2;
}

function square(x) {
  return x * x;
}

function cube(x) {
  return x * x * x;
}

function is_even(n) {
  return n % 2 === 0;
}

function is_divisible(x, y) {
  return x % y === 0;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

export {
  identity,
  inc,
  plus,
  times,
  average,
  square,
  cube,
  is_even,
  is_divisible,
  gcd,
};
