const tolerance = 0.001;

function abs(x) {
  return x >= 0 ? x : -x;
}

function cube(x) {
  return x * x * x;
}

function is_good_enough(guess, x) {
  return abs(cube(guess) - x) < 0.001;
}

function improve(guess, x) {
  return (x / (guess * guess) + 2 * guess) / 3;
}

function cube_root_iter(guess, x) {
  return is_good_enough(guess, x)
    ? guess
    : cube_root_iter(improve(guess, x), x);
}

function cube_root(x) {
  return cube_root_iter(1, x);
}

// cube_root(27)
// == 3.0000005410641766

// cube_root(2)
// == 1.259933493449977

// cube(1.259933493449977)
// == 2.0000592593226547

// cube_root(0.001)
// == 0.11177331656703803

// cube_root(0.000001)
// == 0.08781878786203064
