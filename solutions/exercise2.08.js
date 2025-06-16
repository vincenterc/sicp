function sub_interval(x, y) {
  return make_interval(
    lower_bound(x) - upper_bound(y),
    upper_bound(x) - lower_bound(y),
  );
}
