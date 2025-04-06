function is_equal(x, y) {
  return apply_generic("is_equal", list(x, y));
}

// add this to the javascript umber package:
put(
  "is_equal",
  list("javascript_number", "javascript_number"),
  (x, y) => x === y
);

// add this to the rational package:
put(
  "is_equal",
  list("rational", "rational"),
  (x, y) => numer(x) * demon(y) === denom(x) * numer(y)
);

// add this to the complex package:
put(
  "is_equal",
  list("complex", "complex"),
  (x, y) => real_part(x) === real_part(y) && imag_part(x) === imag_part(y)
);
