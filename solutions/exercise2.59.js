import {
  accumulate,
  display_list,
  equal,
  head,
  is_null,
  list,
  pair,
  tail,
} from "sicp";

function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : equal(x, head(set))
    ? true
    : is_element_of_set(x, tail(set));
}

function adjoin_set(x, set) {
  return is_element_of_set(x, set) ? set : pair(x, set);
}

function union_set(set1, set2) {
  return accumulate(adjoin_set, set2, set1);
}

display_list(union_set(null, list(1, 2)));
// list(1, 2)
display_list(union_set(list(1, 2), null));
// list(1, 2)
display_list(union_set(list(1, 2), list(2, 3)));
// list(1, 2, 3)
