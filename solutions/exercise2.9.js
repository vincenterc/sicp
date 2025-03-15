function add_interval(x, y) {
  return make_interval(
    lower_bound(x) + lower_bound(y),
    upper_bound(x) + upper_bound(y),
  );
}

function sub_interval(x, y) {
  return make_interval(
    lower_bound(x) - upper_bound(y),
    upper_bound(x) - lower_bound(y),
  );
}

function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4));
}

function div_interval(x, y) {
  return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}

// width_add(x, y)
// == ((upper_bound(x) + upper_bound(y)) -
//     (lower_bound(x) + lower_bound(y))) / 2
// == (upper_bound(x) - lower_bound(x)) / 2 +
//    (upper_bound(y) - lower_bound(y)) / 2
// == width(x) + width(y)

// width_sub(x, y)
// == ((upper_bound(x) - lower_bound(y)) -
//     (lower_bound(x) - upper_bound(y))) / 2
// == (upper_bound(x) - lower_bound(x)) / 2 +
//    (upper_bound(y) - lower_bound(y)) / 2
// == width(x) + width(y)

// i1 = [2, 4]
// w1 = 1
// i2 = [4, 8]
// w2 = 2
// i1 * i2 = [8, 32]
// w_i1_mul_i2 = 12
// i2 / i1 = [1, 4]
// w_i2_div_i1 = 1.5
