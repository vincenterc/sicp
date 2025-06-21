import { display } from 'sicp';
import { square } from './math.js';

function compose(f, g) {
  return (x) => f(g(x));
}

function repeated(f, n) {
  return n === 1 ? f : compose(f, repeated(f, n - 1));
}

display(repeated(square, 2)(5));
// 625
