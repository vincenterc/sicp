import { pair } from "sicp";
import { add_streams, scale_stream } from "./stream.js";

function solve_2nd(a, b, dt, y0, dy0) {
  const y = integral(() => dy, y0, dt);
  const dy = integral(() => ddy, dy0, dt);
  const ddy = add_streams(scale_stream(dy, a), scale_stream(y, b));

  return y;
}

function integral(delayed_integrand, initial_value, dt) {
  const integ = pair(initial_value, () => {
    const integrand = delayed_integrand();

    return add_streams(scale_stream(integrand, dt), integ);
  });

  return integ;
}
