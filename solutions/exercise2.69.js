import {
  append,
  display_list,
  head,
  is_null,
  length,
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

function symbols(tree) {
  return is_leaf(tree) ? list(symbol_leaf(tree)) : head(tail(tail(tail(tree))));
}

function weight(tree) {
  return is_leaf(tree) ? weight_leaf(tree) : head(tail(tail(tail(tail(tree)))));
}

function adjoin_set(x, set) {
  return is_null(set)
    ? list(x)
    : weight(x) < weight(head(set))
      ? pair(x, set)
      : pair(head(set), adjoin_set(x, tail(set)));
}

function make_leaf_set(pairs) {
  if (is_null(pairs)) {
    return null;
  } else {
    const first_pair = head(pairs);
    return adjoin_set(
      make_leaf(
        head(first_pair), // symbol
        head(tail(first_pair)),
      ), // frequency
      make_leaf_set(tail(pairs)),
    );
  }
}

function generate_huffman_tree(pairs) {
  return successive_merge(make_leaf_set(pairs));
}

function successive_merge(leaves) {
  return length(leaves) === 1
    ? head(leaves)
    : successive_merge(
        adjoin_set(
          make_code_tree(head(leaves), head(tail(leaves))),
          tail(tail(leaves)),
        ),
      );
}

const sample_pairs = list(
  list("A", 4),
  list("B", 2),
  list("C", 1),
  list("D", 1),
);

display_list(generate_huffman_tree(sample_pairs));
// list("code_tree",
//  list("leaf", "A", 4),
//  list("code_tree",
//     list("leaf", "B", 2),
//     list("code_tree", list("leaf", "D", 1), list("leaf", "C", 1),
//          list("D", "C"), 2),
//     list("B", "D", "C"),
//     4),
//  list("A", "B", "D", "C"),
//  8)
