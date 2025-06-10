import { head, list, pair, tail } from "sicp";
import { square } from "./utils.js";
import {
  display_stream,
  integers,
  stream_tail,
  stream_take,
  weighted_pairs,
} from "./stream.js";

function generate_3_ways_sum_of_squares_numbers() {
  const weighting_f = (i, j) => square(i) + square(j);

  function helper(ps) {
    const first = head(ps);
    const first_weight = weighting_f(head(first), head(tail(first)));
    const second = head(stream_tail(ps));
    const second_weight = weighting_f(head(second), head(tail(second)));
    const third = head(stream_tail(stream_tail(ps)));
    const third_weight = weighting_f(head(third), head(tail(third)));

    return first_weight === second_weight && second_weight === third_weight
      ? pair(list(first, second, third, first_weight), () =>
          helper(stream_tail(stream_tail(stream_tail(ps))))
        )
      : helper(stream_tail(ps));
  }

  return helper(weighted_pairs(integers, integers, weighting_f));
}

display_stream(stream_take(generate_3_ways_sum_of_squares_numbers(), 5));
// [[1, [18, null]], [[6, [17, null]], [[10, [15, null]], [325, null]]]]
// [[5, [20, null]], [[8, [19, null]], [[13, [16, null]], [425, null]]]]
// [[5, [25, null]], [[11, [23, null]], [[17, [19, null]], [650, null]]]]
// [[7, [26, null]], [[10, [25, null]], [[14, [23, null]], [725, null]]]]
// [[2, [29, null]], [[13, [26, null]], [[19, [22, null]], [845, null]]]]

export { generate_3_ways_sum_of_squares_numbers };
