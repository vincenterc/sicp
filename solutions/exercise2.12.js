function make_center_width(c, p) {
  return make_center_width(c, c * (p / 100));
}

function percent(i) {
  return (width(i) / center(i)) * 100;
}
