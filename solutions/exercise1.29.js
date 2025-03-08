import { display } from 'sicp';
import { cube, inc, is_even } from './utils.js';

function integral(f, a, b, dx) {
  function add_dx(x) {
    return x + dx;
  }

  return sum(f, a + dx / 2, add_dx, b) * dx;
}

function integral_simpsons(f, a, b, n) {
  const h = (b - a) / n;

  function y(k) {
    return f(a + k * h);
  }

  function term(k) {
    return k === 0 || k === n ? y(k) : is_even(k) ? 2 * y(k) : 4 * y(k);
  }

  return sum(term, 0, inc, n) * (h / 3);
}

function sum(term, a, next, b) {
  return a > b ? 0 : term(a) + sum(term, next(a), next, b);
}

display(integral(cube, 0, 1, 0.01));
//0.24998750000000042
display(integral_simpsons(cube, 0, 1, 100));
// 0.24999999999999992

display(integral(cube, 0, 1, 0.001));
// 0.249999875000001
display(integral_simpsons(cube, 0, 1, 1000));
// 0.2500000000000003
