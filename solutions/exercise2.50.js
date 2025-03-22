function flip_horiz(painter) {
  return transform_painter(
    painter,
    make_vect(1, 0),
    make_vect(0, 0),
    make_vect(1, 1),
  );
}

function rotate180(painter) {
  return transform_painter(
    painter,
    make_vect(1, 1),
    make_vect(0, 1),
    make_vect(1, 0),
  );
}

function rotate270(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1),
    make_vect(0, 0),
    make_vect(1, 1),
  );
}
