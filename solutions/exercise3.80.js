import { head, pair, tail } from "sicp";
import {
  add_streams,
  display_stream,
  scale_stream,
  stream_take,
} from "./stream.js";

function RLC(R, L, C, dt) {
  return (vc0, il0) => {
    const vc = integral(() => dvc, vc0, dt);
    const il = integral(() => dil, il0, dt);
    const dvc = scale_stream(il, -1 / C);
    const dil = add_streams(scale_stream(vc, 1 / L), scale_stream(il, -R / L));

    return pair(vc, il);
  };
}

function integral(delayed_integrand, initial_value, dt) {
  const integ = pair(initial_value, () => {
    const integrand = delayed_integrand();

    return add_streams(scale_stream(integrand, dt), integ);
  });

  return integ;
}

const RLC1 = RLC(1, 1, 0.2, 0.1);
const v_i_pair = RLC1(10, 0);

display_stream(stream_take(head(v_i_pair), 5));
// 10
// 10
// 9.5
// 8.55
// 7.220000000000001
display_stream(stream_take(tail(v_i_pair), 5));
// 0
// 1
// 1.9
// 2.66
// 3.249
