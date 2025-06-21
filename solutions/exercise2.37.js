import { accumulate, head, is_null, list, map, pair, tail } from "sicp";
import { plus, times } from "./math.js";

function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
    ? null
    : pair(
        accumulate(op, init, map(head, seqs)),
        accumulate_n(op, init, map(tail, seqs)),
      );
}

function dot_product(v, w) {
  return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
}

function matrix_times_vector(m, v) {
  return map((row) => dot_product(row, v), m);
}

function transpose(mat) {
  return accumulate_n(pair, null, mat);
}

function matrix_times_matrix(m, n) {
  const cols = transpose(n);

  return map((row) => map((col) => dot_product(row, col), cols), m);
}
