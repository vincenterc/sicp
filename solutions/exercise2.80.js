function is_equal_to_zero(x) {
  return apply_genetic("is_equal_to_zero", list(x));
}

// to be included in the javascript umber package
put("is_equal_to_zero", list("javascript_number"), (x) => x === 0);

// to be included in the rational package
put("is_equal_to_zero", list("rational"), (x) => numer(x) === 0);

// to be included in the complex package
put(
  "is_equal_to_zero",
  list("complex"),
  (x) => real_part(x) === 0 && imag_part(x) === 0,
);
