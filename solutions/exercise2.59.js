import { accumulate, equal, head, is_null, pair, tail } from "sicp";

function union_set(set1, set2) {
  return accumulate(adjoin_set, set2, set1);
}

function adjoin_set(x, set) {
  return is_element_of_set(x, set) ? set : pair(x, set);
}

function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : equal(x, head(set))
      ? true
      : is_element_of_set(x, tail(set));
}

export { union_set };
