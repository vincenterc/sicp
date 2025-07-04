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

function inc(k) {
  return k + 1;
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

export { plus, times, average, square, cube, inc, is_even, is_divisible, gcd };
