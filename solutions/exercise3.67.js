import { head, list, pair } from "sicp";
import { interleave, stream_map, stream_tail } from "./stream.js";

function pairs(s, t) {
  return pair(list(head(s), head(t)), () =>
    interleave(
      interleave(
        stream_map((x) => list(head(s), x), stream_tail(t)),
        stream_map((x) => list(x, head(t)), stream_tail(s))
      ),
      pairs(stream_tail(s), stream_tail(t))
    )
  );
}

export { pairs };
