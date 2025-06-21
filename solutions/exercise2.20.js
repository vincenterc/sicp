import { display, head, is_null, list, tail } from "sicp";

function plus_curried(x) {
  return (y) => x + y;
}

function brooks(curried_f, items) {
  return is_null(items)
    ? curried_f
    : brooks(curried_f(head(items)), tail(items));
}

display(brooks(plus_curried, list(3, 4)));
// 7

function brooks_curried(items) {
  return brooks(head(items), tail(items));
}

display(brooks_curried(list(plus_curried, 3, 4)));
// 7

// brooks_curried(list(brooks_curried, list(plus_curried, 3, 4)))
// == brooks(brooks_curried, list(list(plus_curried, 3, 4)))
// == brooks_curried(list(plus_curried, 3, 4))
// == brooks(plus_curried, list(3, 4))
// == plus_curried(3)(4)
// == 7
display(brooks_curried(list(brooks_curried, list(plus_curried, 3, 4))));
// 7

// brooks_curried(
//   list(brooks_curried, list(brooks_curried, list(plus_curried, 3, 4))),
// )
// == brooks(
// 	 brooks_curried, list(list(brooks_curried, list(plus_curried, 3, 4)))
//    )
// == brooks_curried(list(brooks_curried, list(plus_curried, 3, 4)))
// == 7
display(
  brooks_curried(
    list(brooks_curried, list(brooks_curried, list(plus_curried, 3, 4))),
  ),
);
// 7
