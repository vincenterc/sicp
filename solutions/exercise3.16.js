import {
  display,
  head,
  is_null,
  is_pair,
  list,
  pair,
  set_tail,
  tail,
} from "sicp";

function count_pairs(x) {
  return !is_pair(x) ? 0 : count_pairs(head(x)) + count_pairs(tail(x)) + 1;
}

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

function last_pair(x) {
  return is_null(tail(x)) ? x : last_pair(tail(x));
}

const z1 = list("a", "b", "c");
//      ______    ______      _____
// z1->|"a"|*-|->|"b"|*-|--->|"c"|/|
//      ------    ------      -----
display(count_pairs(z1));
// 3

const x = pair("a", null);
const y = pair(x, x);
const z2 = pair("b", y);
//      _______     _____
// z2->| "b"|*-|-->| *|* |
//      ------- y-> -|-|-
//                   V V
//                  _____
//              x->|"a"|/|
//                  -----
display(count_pairs(z2));
// 4

const z3 = pair(y, y);
//      _____
// z3->| *|* |
//      -|-|-
//       V V
//      _____
//  y->| *|* |
//      -|-|-
//       V V
//      _____
//  x->|"a"|/|
//      -----
display(count_pairs(z3));
// 7

const z4 = make_cycle(list("a", "b", "c"));
//        ______    ______      ______
// z4--->|"a"|*-|->|"b"|*-|--->|"c"|* |
//    +-> ------    ------      ----|-
//    |                             |
//    +-----------------------------+
// display(count_pairs(z4));
// never return at all
