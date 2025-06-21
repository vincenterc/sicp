import { pair } from "sicp";
import { integers, scale_stream, stream_map_2 } from "./stream.js";

function integrate_series(s) {
  return stream_map_2((x1, x2) => x1 / x2, s, integers);
}

const cosine_series = pair(1, () =>
  scale_stream(integrate_series(sine_series), -1),
);
const sine_series = pair(0, () => integrate_series(cosine_series));

export { integrate_series, cosine_series, sine_series };
