import { display } from "sicp";
import {
  stream_enumerate_interval,
  stream_map,
  stream_map_optimized,
  stream_ref,
} from "./stream.js";

let x = stream_map(display, stream_enumerate_interval(0, 10));
// ==
// stream_map(
//   display,
//   pair(0, () => stream_enumerate_interval(1, 10))
// );
// ==
// pair(display(0), () =>
//   stream_map(
//     display,
//     stream_tail(pair(0, () => stream_enumerate_interval(1, 10)))
//   )
// );
// ==
// pair(0, () =>
//   stream_map(
//     display,
//     stream_tail(pair(0, () => stream_enumerate_interval(1, 10)))
//   )
// );

// 0

stream_ref(x, 5);
// ==
// stream_ref(
//   pair(0, () =>
//     stream_map(
//       display,
//       stream_tail(pair(0, () => stream_enumerate_interval(1, 10)))
//     )
//   ),
//   5
// );
// ==
// stream_ref(
//   pair(display(1), () =>
//     stream_map(
//       display,
//       stream_tail(pair(1, () => stream_enumerate_interval(2, 10)))
//     )
//   ),
//   4
// );
// ==
// stream_ref(
//   pair(display(2), () =>
//     stream_map(
//       display,
//       stream_tail(pair(1, () => stream_enumerate_interval(2, 10)))
//     )
//   ),
//   3
// );
// ==
// stream_ref(
//   pair(display(3), () =>
//     stream_map(
//       display,
//       stream_tail(pair(1, () => stream_enumerate_interval(2, 10)))
//     )
//   ),
//   2
// );
// ==
// stream_ref(
//   pair(display(4), () =>
//     stream_map(
//       display,
//       stream_tail(pair(1, () => stream_enumerate_interval(2, 10)))
//     )
//   ),
//   1
// );
// ==
// stream_ref(
//   pair(display(5), () =>
//     stream_map(
//       display,
//       stream_tail(pair(1, () => stream_enumerate_interval(2, 10)))
//     )
//   ),
//   0
// );
// ==
// 5

// 1
// 2
// 3
// 4
// 5

stream_ref(x, 7);
// 1
// 2
// 3
// 4
// 5
// 6
// 7

display("----------");

let y = stream_map_optimized(display, stream_enumerate_interval(0, 10));
// 0

stream_ref(y, 5);
// 1
// 2
// 3
// 4
// 5

stream_ref(y, 7);
// 6
// 7
