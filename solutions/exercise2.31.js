import {
  display_list,
  head,
  is_null,
  is_pair,
  list,
  map,
  pair,
  tail,
} from "sicp";
import { square } from "./math.js";

function tree_map(f, tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
      ? f(tree)
      : pair(tree_map(f, head(tree)), tree_map(f, tail(tree)));
}

function square_tree(tree) {
  return tree_map(square, tree);
}

display_list(square_tree(list(1, list(2, list(3, 4), 5), list(6, 7))));
// list(1, list(4, list(9, 16), 25), list(36, 49))

function tree_map_map(f, tree) {
  return map(
    (sub_tree) => (is_pair(sub_tree) ? tree_map_map(f, sub_tree) : f(sub_tree)),
    tree,
  );
}

function square_tree_map(tree) {
  return tree_map_map(square, tree);
}

display_list(square_tree_map(list(1, list(2, list(3, 4), 5), list(6, 7))));
// list(1, list(4, list(9, 16), 25), list(36, 49))
