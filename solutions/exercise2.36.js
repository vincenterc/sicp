import {
  accumulate,
  display_list,
  head,
  is_null,
  list,
  map,
  pair,
  tail,
} from 'sicp';
import { plus } from './math.js';

function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
    ? null
    : pair(
        accumulate(op, init, map(head, seqs)),
        accumulate_n(op, init, map(tail, seqs)),
      );
}

const s = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12));

display_list(accumulate_n(plus, 0, s));
// list(22, 26, 30)
