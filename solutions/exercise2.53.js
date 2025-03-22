import { display, display_list, head, list, member, tail } from "sicp";

display(list("a", "b", "c"));
// ["a", ["b", ["c", null]]]
display_list(list("a", "b", "c"));
// list("a", "b", "c")

display(list(list("george")));
// [["george", null], null]
display_list(list(list("george")));
// list(list("george"))

display(tail(list(list("x1", "x2"), list("y1", "y2"))));
// [["y1", ["y2", null]], null]
display_list(tail(list(list("x1", "x2"), list("y1", "y2"))));
// list(list("y1", "y2"))

display(tail(head(list(list("x1", "x2"), list("y1", "y2")))));
// ["x2", null]
display_list(tail(head(list(list("x1", "x2"), list("y1", "y2")))));
// list("x2")

display(member("red", list("blue", "shoes", "yellow", "socks")));
// null
display_list(member("red", list("blue", "shoes", "yellow", "socks")));
// null

display(member("red", list("red", "shoes", "blue", "socks")));
// ["red", ["shoes", ["blue", ["socks", null]]]]
display_list(member("red", list("red", "shoes", "blue", "socks")));
// list("red", "shoes", "blue", "socks")
