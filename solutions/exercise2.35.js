import { accumulate, display, is_pair, list, map, pair } from 'sicp';
import { plus } from './utils.js';

function count_leaves(t) {
  return accumulate(
    plus,
    0,
    map((sub_t) => (!is_pair(sub_t) ? 1 : count_leaves(sub_t)), t),
  );
}

const x = pair(list(1, 2), list(3, 4));

display(count_leaves(x));
// 4

display(count_leaves(list(x, x)));
// 8
