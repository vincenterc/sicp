import { display } from "sicp";

function make_accumulator(initial) {
  return (num) => {
    initial = initial + num;
    return initial;
  };
}

const a = make_accumulator(5);

display(a(10));
// 15
display(a(10));
// 25
