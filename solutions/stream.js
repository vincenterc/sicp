import {
  display,
  head,
  is_null,
  pair,
  stream_for_each,
  stream_tail,
} from "sicp";

function stream_enumerate_interval(low, high) {
  return low > high
    ? null
    : pair(low, () => stream_enumerate_interval(low + 1, high));
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

function display_stream(s) {
  return stream_for_each(display, s);
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
  stream_enumerate_interval,
  stream_map_optimized,
  stream_filter_optimized,
  display_stream,
};
