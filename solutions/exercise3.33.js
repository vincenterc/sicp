// (a + b) * 0.5 = c
// => a + b = 2 * c
//    ______     ______  y  _
// a-|a1    | x |    m1|---|2|
//   |   + s|---|p *   |    -
// b-|a2    |   |    m2|-c
//    ------     ------
//

import {
  make_connector,
  adder,
  multiplier,
  constant,
} from "./constraint-system.js";

function average(a, b, c) {
  const x = make_connector();
  const y = make_connector();

  adder(a, b, x);
  multiplier(y, c, x);
  constant(2, y);

  return "ok";
}

export { average };
