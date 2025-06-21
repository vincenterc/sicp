import { display_list, head, is_null, list, pair, tail } from "sicp";

function adjoin_set(x, set) {
  return is_null(set)
    ? pair(x, null)
    : x < head(set)
      ? pair(x, set)
      : x === head(set)
        ? set
        : pair(head(set), adjoin_set(x, tail(set)));
}

display_list(adjoin_set(1, list(2, 3)));
// list(1, 2, 3)
display_list(adjoin_set(2, list(1, 2, 3)));
// list(1, 2, 3)
display_list(adjoin_set(2, list(1, 3)));
// list(1, 2, 3)
display_list(adjoin_set(3, list(1, 2)));
// list(1, 2, 3)
