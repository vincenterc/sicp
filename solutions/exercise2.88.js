// to be included in the javascript umber package
put("negate", list("javascript_number"), (x) => tag(-x));

// to be included in the rational package
put(
  "negate",
  list("rational", (x) => tag(make_rat(-numer(x), denom(x))))
);

// to be included in the complex package
put("negate", list("complex"), (x) =>
  tag(make_from_real_imag(-real_part(x), -imag_part(x)))
);

function negate(x) {
  return apply_generic("negate", list(x));
}

// to be included in the polynomial package
put("sub", list("polynomial", "polynomial"), (p1, p2) => tag(sub_poly(p1, p2)));

// to be included in the polynomial package
put("negate", list("polynomial"), (p) => tag(negate_poly(p)));

// to be included in the polynomial package
function sub_poly(p1, p2) {
  return is_same_variable(variable(p1), variable(p2))
    ? add_poly(p1, negate_poly(p2))
    : error(list(p1, p2), "polys not in same var -- sub_poly");
}

// to be included in the polynomial package
function negate_poly(p) {
  return make_poly(variable(p), negate_terms(term_list(p)));
}

// to be included in the polynomial package
function negate_terms(ts) {
  return map((t) => make_term(order(t), negate(coeff(t))), ts);
}
