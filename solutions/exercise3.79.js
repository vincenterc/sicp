import { pair } from "sicp";
import { add_streams, scale_stream, stream_map_2 } from "./stream.js";

function solve_2nd(f, y0, dy0, dt) {
  const y = integral(() => dy, y0, dt);
  const dy = integral(() => ddy, dy0, dt);
  const ddy = stream_map_2(f, dy, y);

  return y;
}

function integral(delayed_integrand, initial_value, dt) {
  const integ = pair(initial_value, () => {
    const integrand = delayed_integrand();

    return add_streams(scale_stream(integrand, dt), integ);
  });

  return integ;
}
