import { display, head, math_abs, pair, tail } from 'sicp';

function make_point(x, y) {
  return pair(x, y);
}

function x_point(p) {
  return head(p);
}

function y_point(p) {
  return tail(p);
}

// First representation
// function make_rect(top_left, bottom_right) {
//   return pair(top_left, bottom_right);
// }

// function top_left_rect(r) {
//   return head(r);
// }

// function bottom_right_rect(r) {
//   return tail(r);
// }

// function width_rect(r) {
//   return math_abs(x_point(top_left_rect(r)) - x_point(bottom_right_rect(r)));
// }

// function height_rect(r) {
//   return math_abs(y_point(top_left_rect(r)) - y_point(bottom_right_rect(r)));
// }

// Second representation
function make_rect(top_left, width, height) {
  return pair(top_left, pair(width, height));
}

function position(r) {
  return head(r);
}

function width_rect(r) {
  return head(tail(r));
}

function height_rect(r) {
  return tail(tail(r));
}

function perimeter_rect(r) {
  return 2 * width_rect(r) + 2 * height_rect(r);
}

function area_rect(r) {
  return width_rect(r) * height_rect(r);
}

// First representation
// display(perimeter_rect(make_rect(make_point(1, 1), make_point(4, 5))));
// 14
// display(area_rect(make_rect(make_point(1, 1), make_point(4, 5))));
// 12

// Second representation
display(perimeter_rect(make_rect(make_point(1, 1), 3, 4)));
// 14
display(area_rect(make_rect(make_point(1, 1), 3, 4)));
// 12
