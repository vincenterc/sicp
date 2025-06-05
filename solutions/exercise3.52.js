import { display } from "sicp";
import { is_even } from "./utils.js";
import {
  display_stream,
  stream_enumerate_interval,
  stream_filter,
  stream_filter_optimized,
  stream_map,
  stream_map_optimized,
  stream_ref,
} from "./stream.js";

let sum = 0;

function accum(x) {
  sum = x + sum;
  return sum;
}

const seq = stream_map(accum, stream_enumerate_interval(1, 20));
// seq ==
// pair(1, () =>
//   stream_map(
//     accum,
//     stream_tail(pair(1, () => stream_enumerate_interval(2, 20)))
//   )
// )
// sum == 1

const y = stream_filter(is_even, seq);
// y ==
// pair(6, () =>
//   stream_filter(
//     is_even,
//     stream_tail(
//       pair(6, () =>
//         stream_map(
//           accum,
//           stream_tail(pair(3, () => stream_enumerate_interval(4, 20)))
//         )
//       )
//     )
//   )
// )
// sum == 6

const z = stream_filter((x) => x % 5 === 0, seq);
// z ==
// pair(15, () =>
//   stream_filter(
//     (x) => x % 5 === 0,
//     stream_tail(
//       pair(15, () =>
//         stream_map(
//           accum,
//           stream_tail(pair(4, () => stream_enumerate_interval(5, 20)))
//         )
//       )
//     )
//   )
// )
// sum == 15

display(stream_ref(y, 7));
// sum == 162
// 162

display_stream(z);
// sum == 362
// 15
// 180
// 230
// 305

let sum_opt = 0;

function accum_opt(x) {
  sum_opt = x + sum_opt;
  return sum_opt;
}

const seq_opt = stream_map_optimized(
  accum_opt,
  stream_enumerate_interval(1, 20)
);
// sum_opt == 1

const y_opt = stream_filter_optimized(is_even, seq_opt);
// sum_opt == 6

const z_opt = stream_filter_optimized((x) => x % 5 === 0, seq_opt);
// sum_opt == 10

display(stream_ref(y_opt, 7));
// sum_opt == 136
// 136

display_stream(z_opt);
// sum_opt == 210
// 10
// 15
// 45
// 55
// 105
// 120
// 190
// 210
