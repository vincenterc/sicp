import { is_pair, tail } from "sicp";

function does_contain_cycle(l) {
  function helper(step1, step2) {
    return !is_pair(step2) || !is_pair(tail(step2))
      ? false
      : step1 === step2
      ? true
      : helper(tail(step1), tail(tail(step2)));
  }

  return !is_pair(l) ? false : helper(l, tail(l));
}

export { does_contain_cycle };
