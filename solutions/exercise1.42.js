import { display } from "sicp";
import { inc } from "./utils.js";
import { square } from "./math.js";

function compose(f, g) {
  return (x) => f(g(x));
}

display(compose(square, inc)(6));
// 49
