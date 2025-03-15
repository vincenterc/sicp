import { error } from 'sicp';

function div_interval(x, y) {
  return lower_bound(y) <= 0 && upper_bound(u) >= 0
    ? error('The interval of the divisor spans zero!')
    : mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}
