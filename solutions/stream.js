import {
  display,
  error,
  head,
  integers_from,
  is_null,
  list,
  pair,
  tail,
} from "sicp";

function stream_tail(stream) {
  return tail(stream)();
}

function stream_ref(s, n) {
  return n === 0 ? head(s) : stream_ref(stream_tail(s), n - 1);
}

function stream_take(s0, n0) {
  function helper(s, n) {
    return n === 0
      ? null
      : is_null(s)
      ? error(`stream_take: stream ended before index, index: ${n0}`)
      : pair(head(s), () => helper(stream_tail(s), n - 1));
  }

  return n0 < 0
    ? error(`stream_take: nonnegative integer expected, given: ${n0}`)
    : helper(s0, n0);
}

function stream_map(f, s) {
  return is_null(s)
    ? null
    : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function stream_map_optimized(f, s) {
  return is_null(s)
    ? null
    : pair(
        f(head(s)),
        memo(() => stream_map_optimized(f, stream_tail(s)))
      );
}

function stream_map_2(f, s1, s2) {
  return is_null(s1) || is_null(s2)
    ? null
    : pair(f(head(s1), head(s2)), () =>
        stream_map_2(f, stream_tail(s1), stream_tail(s2))
      );
}

function stream_filter(pred, stream) {
  return is_null(stream)
    ? null
    : pred(head(stream))
    ? pair(head(stream), () => stream_filter(pred, stream_tail(stream)))
    : stream_filter(pred, stream_tail(stream));
}

function stream_filter_optimized(pred, stream) {
  return is_null(stream)
    ? null
    : pred(head(stream))
    ? pair(
        head(stream),
        memo(() => stream_filter_optimized(pred, stream_tail(stream)))
      )
    : stream_filter_optimized(pred, stream_tail(stream));
}

function stream_for_each(fun, s) {
  if (is_null(s)) {
    return true;
  } else {
    fun(head(s));
    return stream_for_each(fun, stream_tail(s));
  }
}

function stream_enumerate_interval(low, high) {
  return low > high
    ? null
    : pair(low, () => stream_enumerate_interval(low + 1, high));
}

function integers_starting_from(n) {
  return pair(n, () => integers_starting_from(n + 1));
}

const integers = integers_from(1);

const ones = pair(1, () => ones);

function display_stream(s) {
  return stream_for_each(display, s);
}

function add_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 + x2, s1, s2);
}

function mul_streams(s1, s2) {
  return stream_map_2((x1, x2) => x1 * x2, s1, s2);
}

function scale_stream(stream, factor) {
  return stream_map((x) => x * factor, stream);
}

function cycle_stream(stream) {
  function helper(s) {
    return is_null(s)
      ? helper(stream)
      : pair(head(s), () => helper(stream_tail(s)));
  }

  return helper(stream);
}

function mul_series(s1, s2) {
  return pair(head(s1) * head(s2), () =>
    add_streams(
      scale_stream(stream_tail(s2), head(s1)),
      mul_series(stream_tail(s1), s2)
    )
  );
}

function invert_unit_series(s) {
  return pair(1, () =>
    scale_stream(mul_series(stream_tail(s), invert_unit_series(s)), -1)
  );
}

function partial_sums(s) {
  return pair(head(s), () => add_streams(partial_sums(s), stream_tail(s)));
}

function pairs(s, t) {
  return pair(list(head(s), head(t)), () =>
    interleave(
      stream_map((x) => list(head(s), x), stream_tail(t)),
      pairs(stream_tail(s), stream_tail(t))
    )
  );
}

function interleave(s1, s2) {
  return is_null(s1)
    ? s2
    : pair(head(s1), () => interleave(s2, stream_tail(s1)));
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

function memo(fun) {
  let already_run = false;
  let result = undefined;
  return () => {
    if (!already_run) {
      result = fun();
      already_run = true;
      return result;
    } else {
      return result;
    }
  };
}

export {
  stream_tail,
  stream_ref,
  stream_take,
  stream_map,
  stream_map_optimized,
  stream_map_2,
  stream_filter,
  stream_filter_optimized,
  stream_for_each,
  stream_enumerate_interval,
  integers_starting_from,
  integers,
  ones,
  display_stream,
  add_streams,
  mul_streams,
  scale_stream,
  cycle_stream,
  mul_series,
  invert_unit_series,
  partial_sums,
  pairs,
  interleave,
  weighted_pairs,
  memo,
};
