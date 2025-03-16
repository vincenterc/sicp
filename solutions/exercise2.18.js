import { append, display_list, head, is_null, list, pair, tail } from 'sicp';

function reverse(items) {
  return is_null(tail(items))
    ? items
    : append(reverse(tail(items)), list(head(items)));
}

display_list(reverse(list(1, 4, 9, 16, 25)));
// list(25, 16, 9, 4, 1)

function reverse_iter(items) {
  function iter(items0, result) {
    return is_null(items0)
      ? result
      : iter(tail(items0), pair(head(items0), result));
  }

  return iter(items, null);
}

display_list(reverse_iter(list(1, 4, 9, 16, 25)));
// list(25, 16, 9, 4, 1)
