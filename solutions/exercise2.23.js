import { display, head, is_null, list, tail } from "sicp";

function for_each(fun, items) {
  if (is_null(items)) {
    return true;
  } else {
    fun(head(items));
    for_each(fun, tail(items));
  }
}

for_each((x) => display(x), list(57, 321, 88));
// 57
// 321
// 88
