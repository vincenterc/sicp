import { display_list, head, is_null, list, pair, tail } from "sicp";

function union_set(set1, set2) {
  if (is_null(set1)) {
    return set2;
  } else if (is_null(set2)) {
    return set1;
  } else {
    const h1 = head(set1);
    const h2 = head(set2);

    return h1 < h2
      ? pair(h1, union_set(tail(set1), set2))
      : h1 > h2
      ? pair(h2, union_set(set1, tail(set2)))
      : // h1 === h2
        pair(h1, union_set(tail(set1), tail(set2)));
  }
}

display_list(union_set(null, list(1, 2)));
// list(1, 2)
display_list(union_set(list(1, 2), null));
// list(1, 2)
display_list(union_set(list(1, 2), list(2, 3)));
// list(1, 2, 3)
