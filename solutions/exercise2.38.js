import { display, display_list, head, is_null, list, tail } from 'sicp';

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

function divide(x, y) {
  return x / y;
}

display(fold_right(divide, 1, list(1, 2, 3)));
// == 1.5

display(fold_left(divide, 1, list(1, 2, 3)));
// == 0.5 / 3
// == 0.16666...

display_list(fold_right(list, null, list(1, 2, 3)));
// == list(1, list(2, list(3, null)))

display_list(fold_left(list, null, list(1, 2, 3)));
// == list(list(list(null, 1), 2), 3)

// op should satisfy the commutative property to guarantee that
// fold_right and fold_left will produce the same values for any sequence.
