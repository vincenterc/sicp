import { pair } from "sicp";
import { add_streams, scale_stream } from "./stream.js";

function RC(R, C, dt) {
  return (i, v0) =>
    add_streams(scale_stream(i, R), integral(scale_stream(i, 1 / C), v0, dt));
}

function integral(integrand, initial_value, dt) {
  const integ = pair(initial_value, () =>
    add_streams(scale_stream(integrand, dt), integ),
  );
  return integ;
}

export { RC };
