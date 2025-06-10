import { head, is_null, list, pair, tail } from "sicp";
import { is_divisible, plus } from "./utils.js";
import { integers, stream_filter, stream_map, stream_tail } from "./stream.js";

function merge_weighted(s1, s2, weight) {
  if (is_null(s1)) {
    return s2;
  } else if (is_null(s2)) {
    return s1;
  } else {
    const s1head = head(s1);
    const s2head = head(s2);
    const s1head_weight = weight(head(s1head), head(tail(s1head)));
    const s2head_weight = weight(head(s2head), head(tail(s2head)));

    return s1head_weight <= s2head_weight
      ? pair(s1head, () => merge_weighted(stream_tail(s1), s2, weight))
      : pair(s2head, () => merge_weighted(s1, stream_tail(s2), weight));
  }
}

function weighted_pairs(s, t, weight) {
  return pair(list(head(s), head(t)), () =>
    merge_weighted(
      stream_map((x) => list(head(s), x), stream_tail(t)),
      weighted_pairs(stream_tail(s), stream_tail(t), weight),
      weight
    )
  );
}

const stream_a = weighted_pairs(integers, integers, plus);
const integers_not_divisible_by_2_3_5 = stream_filter(
  (x) => !is_divisible(x, 2) && !is_divisible(x, 3) && !is_divisible(x, 5),
  integers
);
const stream_b = weighted_pairs(
  integers_not_divisible_by_2_3_5,
  integers_not_divisible_by_2_3_5,
  (i, j) => 2 * i + 3 * j + 5 * i * j
);

export { stream_a, stream_b };
