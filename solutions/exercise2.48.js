import { head, pair, tail } from "sicp";

function make_segment(start, end) {
  return pair(start, end);
}

function start_segment(s) {
  return head(s);
}

function end_segment(s) {
  return tail(s);
}
