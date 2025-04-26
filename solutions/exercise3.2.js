import { display, math_sqrt } from "sicp";

function make_monitored(f) {
  let counter = 0;

  function mf(m) {
    if (m === "how many calls") {
      return counter;
    } else if (m === "reset count") {
      counter = 0;

      return counter;
    } else {
      counter = counter + 1;

      return f(m);
    }
  }

  return mf;
}

const s = make_monitored(math_sqrt);

display(s(100));
// 10

display(s("how many calls"));
// 1
