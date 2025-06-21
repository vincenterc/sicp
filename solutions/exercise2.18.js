import { append, display_list, head, is_null, list, pair, tail } from "sicp";

function reverse(items) {
  return is_null(items)
    ? null
    : append(reverse(tail(items)), list(head(items)));
}

display_list(reverse(list(1, 4, 9, 16, 25)));
// list(25, 16, 9, 4, 1)

function reverse_iter(items0) {
  function iter(items, result) {
    return is_null(items)
      ? result
      : iter(tail(items), pair(head(items), result));
  }

  return iter(items0, null);
}

display_list(reverse_iter(list(1, 4, 9, 16, 25)));
// list(25, 16, 9, 4, 1)
