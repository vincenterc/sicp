import { accumulate } from "sicp";

// to be included in the polynomial package
put("is_equal_to_zero", list("polynomial"), (p) =>
  accumulate(
    (t, res) => (res ? is_equal_to_zero(coeff(t)) : res),
    true,
    term_list(p)
  )
);
