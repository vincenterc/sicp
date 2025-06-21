import { head, is_null, is_pair, pair, tail } from "sicp";

function count_pairs(x) {
  let counted_pairs = null;

  function is_counted_pair(p, ps_counted) {
    return is_null(ps_counted)
      ? false
      : p === head(ps_counted)
        ? true
        : is_counted_pair(p, tail(ps_counted));
  }

  function count(p) {
    if (!is_pair(p) || is_counted_pair(p, counted_pairs)) {
      return 0;
    } else {
      counted_pairs = pair(p, counted_pairs);

      return count(head(p)) + count(tail(p)) + 1;
    }
  }

  return count(x);
}

export { count_pairs };
