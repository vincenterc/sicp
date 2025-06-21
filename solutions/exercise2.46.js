import { head, pair, tail } from "sicp";

function make_vect(x, y) {
  return pair(x, y);
}

function xcor_vect(v) {
  return head(v);
}

function ycor_vect(v) {
  return tail(v);
}

function add_vect(v1, v2) {
  return make_vect(
    xcor_vect(v1) + xcor_vect(v2),
    ycor_vect(v1) + ycor_vect(v2),
  );
}

function sub_vect(v1, v2) {
  return make_vect(
    xcor_vect(v1) - xcor_vect(v2),
    ycor_vect(v1) - ycor_vect(v2),
  );
}

function scale_vect(s, v) {
  return make_vect(s * xcor_vect(v), s * ycor_vect(v));
}
