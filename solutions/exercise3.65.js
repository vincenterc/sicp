import { display, head, pair } from "sicp";
import {
  memo,
  partial_sums,
  stream_map,
  stream_ref,
  stream_tail,
  stream_take,
} from "./stream.js";
import { square } from "./math.js";

function ln2_summands(n) {
  return pair(1 / n, () => stream_map((x) => -x, ln2_summands(n + 1)));
}

const ln2_stream = partial_sums(ln2_summands(1));

display(stream_take(ln2_stream, 8));
// 1
// 0.5
// 0.8333333333333333
// 0.5833333333333333
// 0.7833333333333332
// 0.6166666666666666
// 0.7595238095238095
// 0.6345238095238095
// "..."
// This sequence converge rather slowly. Eight terms of the sequence
// bound the value of ln2 between 0.7595 and 0.6345.

function euler_transform(s) {
  const s0 = stream_ref(s, 0); // Sn−1
  const s1 = stream_ref(s, 1); // Sn
  const s2 = stream_ref(s, 2); // Sn+1
  return pair(
    s2 - square(s2 - s1) / (s0 + -2 * s1 + s2),
    memo(() => euler_transform(stream_tail(s))),
  );
}

display(stream_take(euler_transform(ln2_stream), 8));
// 0.7
// 0.6904761904761905
// 0.6944444444444444
// 0.6924242424242424
// 0.6935897435897436
// 0.6928571428571428
// 0.6933473389355742
// 0.6930033416875522
// "..."
// This sequence converge much faster. Eight terms of the sequence
// bound the value of ln2 between 0.6934 and 0.6930.

function make_tableau(transform, s) {
  return pair(s, () => make_tableau(transform, transform(s)));
}

function accelerated_sequence(transform, s) {
  return stream_map(head, make_tableau(transform, s));
}

display(stream_take(accelerated_sequence(euler_transform, ln2_stream), 8));
// 1
// 0.7
// 0.6932773109243697
// 0.6931488693329254
// 0.6931471960735491
// 0.6931471806635636
// 0.6931471805604039
// 0.6931471805599445
// "..."
// The eighth term of this sequence gives the correct value of ln2 to 14
// decimal places.
