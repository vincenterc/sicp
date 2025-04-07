function is_equal(x, y) {
  return apply_generic("is_equal", list(x, y));
}

// to be included in the javascript umber package
put(
  "is_equal",
  list("javascript_number", "javascript_number"),
  (x, y) => x === y
);

// to be included in the rational package
put(
  "is_equal",
  list("rational", "rational"),
  (x, y) => numer(x) * demon(y) === denom(x) * numer(y)
);

// to be included in the complex package
put(
  "is_equal",
  list("complex", "complex"),
  (x, y) => real_part(x) === real_part(y) && imag_part(x) === imag_part(y)
);
