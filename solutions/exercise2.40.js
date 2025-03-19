import { accumulate, append, display_list, list, map, pair } from 'sicp';

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function flatmap(f, seq) {
  return accumulate(append, null, map(f, seq));
}

function unique_pairs(n) {
  return flatmap(
    (i) => map((j) => list(j, i), enumerate_interval(1, i - 1)),
    enumerate_interval(1, n),
  );
}

display_list(unique_pairs(3));
// list(list(2, 1), list(3, 1), list(3, 2))

function prime_sum_pairs(n) {
  return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n)));
}
