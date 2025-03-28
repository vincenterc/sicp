import {
  append,
  display_list,
  equal,
  error,
  head,
  is_null,
  list,
  pair,
  tail,
} from "sicp";

function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : equal(x, head(set))
    ? true
    : is_element_of_set(x, tail(set));
}

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
    weight(left) + weight(right)
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

function encode(message, tree) {
  return is_null(message)
    ? null
    : append(encode_symbol(head(message), tree), encode(tail(message), tree));
}

function encode_symbol(s, tree) {
  function encode_symbol_1(current_branch) {
    if (is_leaf(current_branch)) {
      return null;
    } else {
      const left = left_branch(current_branch);

      return is_element_of_set(s, symbols(left))
        ? pair(0, encode_symbol_1(left))
        : pair(1, encode_symbol_1(right_branch(current_branch)));
    }
  }

  return is_element_of_set(s, symbols(tree))
    ? encode_symbol_1(tree)
    : error(s, "bad symbol -- choose_branch");
}

const sample_tree = make_code_tree(
  make_leaf("A", 4),
  make_code_tree(
    make_leaf("B", 2),
    make_code_tree(make_leaf("D", 1), make_leaf("C", 1))
  )
);
const sample_message = list("A", "D", "A", "B", "B", "C", "A");

display_list(encode(sample_message, sample_tree));
// list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0)
