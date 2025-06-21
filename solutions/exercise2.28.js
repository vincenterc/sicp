import { append, display_list, head, is_null, is_pair, list, tail } from "sicp";

const x = list(list(1, 2), list(3, 4));

function fringe(items) {
  return is_null(items)
    ? null
    : !is_pair(items)
      ? list(items)
      : append(fringe(head(items)), fringe(tail(items)));
}

display_list(fringe(x));
// list(1, 2, 3, 4)

display_list(fringe(list(x, x)));
// list(1, 2, 3, 4, 1, 2, 3, 4)
