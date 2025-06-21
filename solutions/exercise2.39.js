import { append, display_list, head, is_null, list, pair, tail } from "sicp";

function fold_right(op, initial, sequence) {
  return is_null(sequence)
    ? initial
    : op(head(sequence), fold_right(op, initial, tail(sequence)));
}

function fold_left(op, initial, sequence) {
  function iter(result, rest) {
    return is_null(rest) ? result : iter(op(result, head(rest)), tail(rest));
  }
  return iter(initial, sequence);
}

function reverse_fold_right(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

display_list(reverse_fold_right(list(1, 2, 3, 4, 5)));
// list(5, 4, 3, 2, 1)S

function reverse_fold_left(sequence) {
  return fold_left((x, y) => pair(y, x), null, sequence);
}

display_list(reverse_fold_left(list(1, 2, 3, 4, 5)));
// list(5, 4, 3, 2, 1)
