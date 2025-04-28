import { display } from "sicp";

function make_f() {
  let inner = 0;

  return (x) => {
    let temp = inner;
    inner = x;

    return temp;
  };
}

let f = make_f();

display(f(0) + f(1));
// 0

f = make_f();

display(f(1) + f(0));
// 1
