import { cube, square } from "./math.js";

function cubic(a, b, c) {
  return (x) => cube(x) + a * square(x) + b * x + c;
}
