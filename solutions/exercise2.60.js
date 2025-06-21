import { append, equal, is_null, pair, tail } from "sicp";

function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : equal(x, head(set))
      ? true
      : is_element_of_set(x, tail(set));
}
// O(n)

function adjoin_set(x, set) {
  return pair(x, set);
}
// O(1)

function union_set(set1, set2) {
  return append(set1, set2);
}
// O(n)

function intersection(set1, set2) {
  return is_null(set1)
    ? null
    : is_element_of_set(head(set1), set2)
      ? pair(head(set1), intersection(tail(set1), set2))
      : intersection(tail(set1), set2);
}
// O(n^2)

// If duplicates are rare, we may consider the version with duplicates.
