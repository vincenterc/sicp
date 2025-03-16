import { display, head, is_null, list, pair, tail } from 'sicp';
import { square } from './utils.js';

function square_list(items) {
  return is_null(items)
    ? null
    : pair(square(head(items)), square_list(tail(items)));
}

display(square_list(list(1, 2, 3, 4)));
// [1, [4, [9, [16, null]]]]

function square_list_map(items) {
  return map(square, items);
}

display(square_list(list(1, 2, 3, 4)));
// [1, [4, [9, [16, null]]]]
