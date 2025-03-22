function below(painter1, painter2) {
  const split_point = make_vect(0, 0.5);
  const paint_bottom = transform_painter(
    painter1,
    make_vect(0, 0),
    make_vect(1, 0),
    split_point,
  );
  const paint_top = transform_painter(
    painter2,
    split_point,
    make_vect(1, 0.5),
    make(0, 1),
  );

  return (frame) => {
    paint_bottom(frame);
    paint_top(frame);
  };
}

function below_v2(painter1, painter2) {
  return rotate90(beside(rotate270(painter1), rotate270(painter2)));
}
