import { head, is_null, pair } from "sicp";
import { stream_map, stream_tail } from "./stream.js";

function integral(delayed_integrand, initial_value, dt) {
  return pair(initial_value, () => {
    const integrand = delayed_integrand();

    return is_null(integrand)
      ? null
      : integral(
          () => stream_tail(integrand),
          dt * head(integrand) + initial_value,
          dt,
        );
  });
}

function solve(f, y0, dt) {
  const y = integral(() => dy, y0, dt);
  const dy = stream_map(f, y);
  return y;
}

export { solve };
