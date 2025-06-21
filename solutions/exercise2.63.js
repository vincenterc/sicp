import { append, display_list, head, is_null, list, pair, tail } from "sicp";

const tree1 = list(
  7,
  list(3, list(1, null, null), list(5, null, null)),
  list(9, null, list(11, null, null)),
);
const tree2 = list(
  3,
  list(1, null, null),
  list(7, list(5, null, null), list(9, null, list(11, null, null))),
);
const tree3 = list(
  5,
  list(3, list(1, null, null), null),
  list(9, list(7, null, null), list(11, null, null)),
);

function entry(tree) {
  return head(tree);
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function tree_to_list_1(tree) {
  return is_null(tree)
    ? null
    : append(
        tree_to_list_1(left_branch(tree)),
        pair(entry(tree), tree_to_list_1(right_branch(tree))),
      );
}

display_list(tree_to_list_1(tree1));
// list(1, 3, 5, 7, 9, 11)
display_list(tree_to_list_1(tree2));
// list(1, 3, 5, 7, 9, 11)
display_list(tree_to_list_1(tree3));
// list(1, 3, 5, 7, 9, 11)

function tree_to_list_2(tree) {
  function copy_to_list(tree, result_list) {
    return is_null(tree)
      ? result_list
      : copy_to_list(
          left_branch(tree),
          pair(entry(tree), copy_to_list(right_branch(tree), result_list)),
        );
  }
  return copy_to_list(tree, null);
}

display_list(tree_to_list_2(tree1));
// list(1, 3, 5, 7, 9, 11)
display_list(tree_to_list_2(tree2));
// list(1, 3, 5, 7, 9, 11)
display_list(tree_to_list_2(tree3));
// list(1, 3, 5, 7, 9, 11)

// The two functions produce the same results. For the tree1, tree2 and
// tree3, both functions produce list(1, 3, 5, 7, 9).

// The order of growth of the function tree_to_list_1 is O(n*log(n)),
// while the order of growth of the function tree_to_list_2 is
// O(n).
