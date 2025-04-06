function is_equal_to_zero(x) {
  return apply_genetic("is_equal_to_zero", list(x));
}

// add this to the javascript umber package:
put("is_equal_to_zero", list("javascript_number"), (x) => x === 0);

// add this to the rational package:
put("is_equal_to_zero", list("rational"), (x) => numer(x) === 0);

// add this to the complex package:
put(
  "is_equal_to_zero",
  list("complex"),
  (x) => real_part(x) === 0 && imag_part(x) === 0
);
