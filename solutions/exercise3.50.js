import { head, is_null, pair, stream_tail } from "sicp";

function stream_map_2(f, s1, s2) {
  return is_null(s1) || is_null(s2)
    ? null
    : pair(f(head(s1), head(s2)), () =>
        stream_map_2(f, stream_tail(s1), stream_tail(s2))
      );
}

function stream_map_2_optimized(f, s1, s2) {
  return is_null(s1) || is_null(s2)
    ? null
    : pair(
        f(head(s1), head(s2)),
        memo(() => stream_map_2_optimized(f, stream_tail(s1), stream_tail(s2)))
      );
}

export { stream_map_2, stream_map_2_optimized };
