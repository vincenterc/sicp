import {
  append,
  display_list,
  head,
  is_null,
  is_pair,
  list,
  map,
  pair,
  tail,
} from "sicp";

const x = list(list(1, 2), list(3, 4));

display_list(x);
// list(list(1, 2), list(3, 4))

function reverse(items) {
  return is_null(items)
    ? null
    : append(reverse(tail(items)), list(head(items)));
}

display_list(reverse(x));
// list(list(3, 4), list(1, 2))

function deep_reverse(items) {
  return !is_pair(items)
    ? items
    : append(deep_reverse(tail(items)), list(deep_reverse(head(items))));
}

display_list(deep_reverse(x));
// list(list(4, 3), list(2, 1))

function deep_reverse_iter(items0) {
  function iter(items, result) {
    return is_null(items)
      ? result
      : iter(tail(items), pair(deep_reverse_iter(head(items)), result));
  }

  return !is_pair(items0) ? items0 : iter(items0, null);
}

display_list(deep_reverse_iter(x));
// list(list(4, 3), list(2, 1))

function deep_reverse_map(items) {
  return !is_pair(items) ? items : map(deep_reverse_map, reverse(items));
}

display_list(deep_reverse_map(x));
// list(list(4, 3), list(2, 1))
