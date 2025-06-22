import { display } from "sicp";
import { inc } from "./math.js";

function double(f) {
  return (x) => f(f(x));
}

display(double(inc)(5));
// double(inc)(5)
// == (x => inc(inc(x)))(5)
// == inc(inc(5))
// == 7

display(double(double)(inc)(5));
// double(double)(inc)(5)
// == (x => double(double(x)))(inc)(5)
// == double(double(inc))(5)
// == (x => (double(inc)(double(inc)(x))))(5)
// == double(inc)(double(inc)(5))
// == double(inc)(7)
// == 9

display(double(double(double))(inc)(5));
// double(double(double))(inc)(5)
// == (x => double(double)(double(double)(x)))(inc)(5)
// == double(double)(double(double)(inc))(5)
// == (x => double(double(x)))(double(double)(inc))(5)
// == double(double(double(double)(inc)))(5)
// == (x => double(double(double)(inc))
//    (double(double(double)(inc))(x)))(5)
// == double(double(double)(inc))
//    (double(double(double)(inc))(5))
// == double(double(double(inc)))
//    ((x => double(double)(inc)(double(double)(inc)(x)))(5))
// == double(double(double)(inc))
//    (double(double)(inc)(double(double)(inc)(5)))
// == double(double(double)(inc))
//    (double(double)(inc)(9))
// == double(double(double)(inc))(13)
// == 21
