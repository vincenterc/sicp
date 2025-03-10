import { cube, square } from './utils.js';

function cubic(a, b, c) {
  return (x) => cube(x) + a * square(x) + b * x + c;
}
