import { head, pair, tail } from 'sicp';

function make_interval(x, y) {
  return pair(x, y);
}

function upper_bound(i) {
  return tail(i);
}

function lower_bound(i) {
  return head(i);
}
