import {
  display,
  head,
  is_null,
  is_number,
  is_pair,
  is_string,
  list,
  tail,
} from "sicp";

function equal(a, b) {
  return is_null(a) && is_null(b)
    ? true
    : is_pair(a) && is_pair(b)
      ? equal(head(a), head(a)) && equal(tail(a), tail(b))
      : (is_string(a) && is_string(b)) || (is_number(a) && is_number(b))
        ? a === b
        : false;
}

display(
  equal(list("this", "is", "a", "list"), list("this", "is", "a", "list")),
);
// true

display(
  equal(list("this", "is", "a", "list"), list("this", list("is", "a"), "list")),
);
// false
