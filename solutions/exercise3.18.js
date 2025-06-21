import { is_null, is_pair, member, pair, set_tail, tail } from "sicp";

function does_contain_cycle(l0) {
  function helper(l, visited) {
    return !is_pair(l)
      ? false
      : !is_null(member(l, visited))
        ? true
        : helper(tail(l), pair(l, visited));
  }

  return helper(l0, null);
}

function make_cycle(x) {
  set_tail(last_pair(x), x);
  return x;
}

function last_pair(x) {
  return is_null(tail(x)) ? x : last_pair(tail(x));
}

export { does_contain_cycle, make_cycle };
