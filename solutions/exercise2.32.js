import {
  append,
  display_list,
  head,
  is_null,
  list,
  map,
  pair,
  tail,
} from 'sicp';

function subsets(s) {
  if (is_null(s)) {
    return list(null);
  } else {
    const rest = subsets(tail(s));
    return append(
      rest,
      map((subset) => pair(head(s), subset), rest),
    );
  }
}

display_list(subsets(list(1, 2, 3)));
// list(
//   null,
//   list(3),
//   list(2),
//   list(2, 3),
//   list(1),
//   list(1, 3),
//   list(1, 2),
//   list(1, 2, 3),
// );

// All subsets of the given set include those that contain
// the first element e as well as those that do not.
// Therefore to obtain all subsets that include e,
// we need to add e to each subset that does not already contain it.