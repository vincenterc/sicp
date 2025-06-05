import { display, head, integers_from, is_null, pair, tail } from "sicp";

function stream_tail(stream) {
  return tail(stream)();
}

function stream_ref(s, n) {
  return n === 0 ? head(s) : stream_ref(stream_tail(s), n - 1);
}

function stream_map(f, s) {
  return is_null(s)
    ? null
    : pair(f(head(s)), () => stream_map(f, stream_tail(s)));
}

function stream_filter(pred, stream) {
  return is_null(stream)
    ? null
    : pred(head(stream))
    ? pair(head(stream), () => stream_filter(pred, stream_tail(stream)))
    : stream_filter(pred, stream_tail(stream));
}

function stream_for_each(fun, s) {
  if (is_null(s)) {
    return true;
  } else {
    fun(head(s));
    return stream_for_each(fun, stream_tail(s));
  }
}

function stream_map_2(f, s1, s2) {
  return is_null(s1) || is_null(s2)
    ? null
    : pair(f(head(s1), head(s2)), () =>
        stream_map_2(f, stream_tail(s1), stream_tail(s2))
      );
}

function stream_map_optimized(f, s) {
  return is_null(s)
    ? null
    : pair(
        f(head(s)),
        memo(() => stream_map_optimized(f, stream_tail(s)))
      );
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

function stream_enumerate_interval(low, high) {
  return low > high
    ? null
    : pair(low, () => stream_enumerate_interval(low + 1, high));
}

function integers_starting_from(n) {
  return pair(n, () => integers_starting_from(n + 1));
}

const integers = integers_from(1);

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
  stream_map,
  stream_filter,
  stream_for_each,
  stream_map_2,
  stream_map_optimized,
  stream_filter_optimized,
  stream_enumerate_interval,
  integers_starting_from,
  integers,
  display_stream,
  add_streams,
  mul_streams,
  scale_stream,
  mul_series,
  invert_unit_series,
};
