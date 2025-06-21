import {
  display_list,
  head,
  is_null,
  is_pair,
  list,
  map,
  pair,
  tail,
} from 'sicp';
import { square } from './math.js';

function square_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? square(tree)
    : pair(square_tree(head(tree)), square_tree(tail(tree)));
}

display_list(square_tree(list(1, list(2, list(3, 4), 5), list(6, 7))));
// list(1, list(4, list(9, 16), 25), list(36, 49))

function square_tree_map(tree) {
  return map(
    (sub_tree) =>
      is_pair(sub_tree) ? square_tree_map(sub_tree) : square(sub_tree),
    tree,
  );
}

display_list(square_tree_map(list(1, list(2, list(3, 4), 5), list(6, 7))));
// list(1, list(4, list(9, 16), 25), list(36, 49))
