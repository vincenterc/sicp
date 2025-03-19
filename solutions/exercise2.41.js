import {
  accumulate,
  append,
  display_list,
  filter,
  list,
  map,
  pair,
} from 'sicp';
import { plus } from './utils.js';

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function unique_triples(n) {
  return flatmap(
    (i) =>
      flatmap(
        (j) => map((k) => list(k, j, i), enumerate_interval(1, j - 1)),
        enumerate_interval(1, i - 1),
      ),
    enumerate_interval(1, n),
  );
}

display_list(unique_triples(4));
// list(list(1, 2, 3), list(1, 2, 4), list(1, 3, 4), list(2, 3, 4))

function triples_sum_to_s(n, s) {
  return filter((items) => accumulate(plus, 0, items) === s, unique_triples(n));
}

display_list(triples_sum_to_s(4, 8));
// list(list(1, 3, 4))
