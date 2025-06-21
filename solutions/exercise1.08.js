import { display, math_abs } from 'sicp';
import { cube } from './math.js';

const tolerance = 0.001;

function cube_root(x) {
  return cube_root_iter(1, x);
}

function cube_root_iter(guess, x) {
  return is_good_enough(guess, x)
    ? guess
    : cube_root_iter(improve(guess, x), x);
}

function is_good_enough(guess, x) {
  return math_abs(cube(guess) - x) < 0.001;
}

function improve(guess, x) {
  return (x / (guess * guess) + 2 * guess) / 3;
}

display(cube_root(27));
// 3.0000005410641766

display(cube_root(2));
// 1.259933493449977

display(cube(1.259933493449977));
// 2.0000592593226547

display(cube_root(0.001));
// 0.11177331656703803

display(cube_root(0.000001));
// 0.08781878786203064
