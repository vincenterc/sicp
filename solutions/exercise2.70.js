import {
  append,
  display,
  display_list,
  equal,
  head,
  is_null,
  length,
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
        head(tail(first_pair))
      ), // frequency
      make_leaf_set(tail(pairs))
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
          tail(tail(leaves))
        )
      );
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

const pairs = list(
  list("A", 2),
  list("BOOM", 1),
  list("GET", 2),
  list("JOB", 2),
  list("NA", 16),
  list("SHA", 3),
  list("YIP", 9),
  list("WAH", 1)
);
const tree = generate_huffman_tree(pairs);
const message = list(
  "GET",
  "A",
  "JOB",
  "SHA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "GET",
  "A",
  "JOB",
  "SHA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "NA",
  "WAH",
  "YIP",
  "YIP",
  "YIP",
  "YIP",
  "YIP",
  "YIP",
  "YIP",
  "YIP",
  "YIP",
  "SHA",
  "BOOM"
);
const encoded = encode(message, tree);

display(length(message));
// 36
display(length(encoded));
// 84

// 3*36=108 bits would be needed if we use a fixed-length code.
