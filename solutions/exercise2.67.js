import {
  append,
  display_list,
  error,
  head,
  is_null,
  list,
  pair,
  tail,
} from "sicp";

function make_leaf(symbol, weight) {
  return list("leaf", symbol, weight);
}

function is_leaf(object) {
  return head(object) === "leaf";
}

function symbol_leaf(x) {
  return head(tail(x));
}

function weight_leaf(x) {
  return head(tail(tail(x)));
}

function make_code_tree(left, right) {
  return list(
    "code_tree",
    left,
    right,
    append(symbols(left), symbols(right)),
    weight(left) + weight(right),
  );
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function symbols(tree) {
  return is_leaf(tree) ? list(symbol_leaf(tree)) : head(tail(tail(tail(tree))));
}

function weight(tree) {
  return is_leaf(tree) ? weight_leaf(tree) : head(tail(tail(tail(tail(tree)))));
}

function decode(bits, tree) {
  function decode_1(bits, current_branch) {
    if (is_null(bits)) {
      return null;
    } else {
      const next_branch = choose_branch(head(bits), current_branch);
      return is_leaf(next_branch)
        ? pair(symbol_leaf(next_branch), decode_1(tail(bits), tree))
        : decode_1(tail(bits), next_branch);
    }
  }
  return decode_1(bits, tree);
}

function choose_branch(bit, branch) {
  return bit === 0
    ? left_branch(branch)
    : bit === 1
      ? right_branch(branch)
      : error(bit, "bad bit -- choose_branch");
}

const sample_tree = make_code_tree(
  make_leaf("A", 4),
  make_code_tree(
    make_leaf("B", 2),
    make_code_tree(make_leaf("D", 1), make_leaf("C", 1)),
  ),
);
const sample_message = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0);

display_list(decode(sample_message, sample_tree));
// list("A", "D", "A", "B", "B", "C", "A")
