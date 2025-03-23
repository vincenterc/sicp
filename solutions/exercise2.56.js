function is_exp(x) {
  return is_pair(x) && head(x) === "**";
}

function base(e) {
  return head(tail(e));
}

function exponent(e) {
  return head(tail(tail(e)));
}

function make_exp(b, e) {
  return number_equal(e, 0) ? 1 : number_equal(e, 1) ? b : list("**", b, e);
}

function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp)
    ? make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp)
    ? make_sum(
        make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product(deriv(multiplier(exp), variable), multiplicand(exp))
      )
    : is_exp(exp)
    ? make_product(
        make_product(exponent(exp), make_exp(base(exp), exponent(exp) - 1)),
        deriv(base(exp), variable)
      )
    : error(exp, "unknown expression type -- deriv");
}
