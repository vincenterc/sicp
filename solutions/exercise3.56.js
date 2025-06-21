import { head, is_null, pair } from "sicp";
import { scale_stream, stream_tail } from "./stream.js";

const S = pair(1, () =>
  merge(scale_stream(S, 2), merge(scale_stream(S, 3), scale_stream(S, 5))),
);

function merge(s1, s2) {
  if (is_null(s1)) {
    return s2;
  } else if (is_null(s2)) {
    return s1;
  } else {
    const s1head = head(s1);
    const s2head = head(s2);

    return s1head < s2head
      ? pair(s1head, () => merge(stream_tail(s1), s2))
      : s1head > s2head
        ? pair(s2head, () => merge(s1, stream_tail(s2)))
        : pair(s1head, () => merge(stream_tail(s1), stream_tail(s2)));
  }
}

export { S };
