import { head, pair, tail } from "sicp";
import { cube } from "./math.js";
import {
  display_stream,
  integers,
  stream_tail,
  stream_take,
  weighted_pairs,
} from "./stream.js";

function generate_ramanujan_numbers() {
  const weighting_f = (i, j) => cube(i) + cube(j);

  function helper(ps) {
    const first = head(ps);
    const first_weight = weighting_f(head(first), head(tail(first)));
    const second = head(stream_tail(ps));
    const second_weight = weighting_f(head(second), head(tail(second)));

    return first_weight !== second_weight
      ? helper(stream_tail(ps))
      : pair(first_weight, () => helper(stream_tail(stream_tail(ps))));
  }

  return helper(weighted_pairs(integers, integers, weighting_f));
}

display_stream(stream_take(stream_tail(generate_ramanujan_numbers()), 5));
// 4104
// 13832
// 20683
// 32832
// 39312

export { generate_ramanujan_numbers };
