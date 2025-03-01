function abs(x) {
  return x >= 0 ? x : -x;
}

function square(x) {
  return x * x;
}

function is_good_enough(guess, x) {
  return abs(square(guess) - x) < 0.001;
}

function average(x, y) {
  return (x + y) / 2;
}

function improve(guess, x) {
  return average(guess, x / guess);
}

function sqrt_iter(guess, x) {
  return is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x);
}

function sqrt(x) {
  return sqrt_iter(1, x);
}

// sqrt(0.0001)
// == 0.03230844833048122
// expected value 0.01

// sqrt(10000000000000)
// not terminate

const tolerance = 0.001;

function is_good_enough_v2(pre_guess, guess) {
  return abs(guess - pre_guess) / pre_guess < tolerance;
}

function sqrt_iter_v2(guess, x) {
  return is_good_enough_v2(guess, improve(guess, x))
    ? guess
    : sqrt_iter_v2(improve(guess, x), x);
}

function sqrt_v2(x) {
  return sqrt_iter_v2(1, x);
}

// sqrt_v2(0.0001)
// == 0.010000714038711746

// sqrt_v2(10000000000000)
// == 3162433.547242504
// square(3162433.547242504)
// == 10000985940724.807
