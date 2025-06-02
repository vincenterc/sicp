import { head, pair, stream_tail } from "sicp";
import { add_streams, scale_stream } from "./stream.js";

// s1 = head(s1) + tail(s1)
// s2 = head(s2) + tail(S2)
// s1 * s2 = head(s1) * head(s2)
//         + head(s1) * tail(s2)
//         + tail(s1) * head(s2)
//         + tail(s1) * tail(s2)
//         = head(s1) * tail(s2)
//         + head(s1) * tail(s2)
//         + tail(s1) * (head(s2) + tail(s2))
//         = head(s1) * tail(s2)
//         + head(s1) * tail(s2) 
//         + tail(s1) * s2
//         = head(s1) * head(s2)
//         + tail(s1) * head(s2)
//         + (head(s1) + tail(s1)) * tail(s2)
//         = head(s1) * head(s2)
//         + tail(s1) * head(s2)
//         = s1 * tail(s2)

function mul_series(s1, s2) {
  return pair(head(s1) * head(s2), () =>
    add_streams(
      scale_stream(stream_tail(s2), head(s1)),
      mul_series(stream_tail(s1), s2)
    )
  );
}

export { mul_series };
