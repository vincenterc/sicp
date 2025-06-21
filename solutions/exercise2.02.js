import { display, head, pair, stringify, tail } from 'sicp';
import { average } from './math.js';

function make_segment(start, end) {
  return pair(start, end);
}

function start_segment(s) {
  return head(s);
}

function end_segment(s) {
  return tail(s);
}

function make_point(x, y) {
  return pair(x, y);
}

function x_point(p) {
  return head(p);
}

function y_point(p) {
  return tail(p);
}

function midpoint_segment(s) {
  const start = start_segment(s);
  const end = end_segment(s);

  return pair(
    average(x_point(start), x_point(end)),
    average(y_point(start), y_point(end)),
  );
}

function print_point(p) {
  return display(
    '(' + stringify(x_point(p)) + ', ' + stringify(y_point(p)) + ')',
  );
}

print_point(midpoint_segment(make_segment(make_point(1, 2), make_point(5, 8))));
// (3, 5)
