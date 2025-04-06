// a.
// Numbers and variables do not have obvious keys as type tags,
// so we can not assimilate is_number and is_same_variable into
// the data-directed dispatch.

// b.
function install_sum_package() {
  function addend(s) {
    return head(s);
  }

  function augend(s) {
    return head(tail(s));
  }

  function make_sum(a1, a2) {
    return list("+", a1, a2);
  }

  function deriv_sum(args, variable) {
    return make_sum(
      deriv(addend(args), variable),
      deriv(augend(args), variable)
    );
  }

  put("deriv", "+", deriv_sum);

  return "done";
}

function install_sum_package() {
  function multiplier(s) {
    return head(s);
  }

  function multiplicand(s) {
    return head(tail(s));
  }

  function make_sum(a1, a2) {
    return list("+", a1, a2);
  }

  function make_product(m1, m2) {
    return list("*", m1, m2);
  }

  function deriv_product(args, variable) {
    return make_sum(
      make_product(multiplier(args), deriv(multiplicand(args), variable)),
      make_product(deriv(multiplier(args), variable), multiplicand(args))
    );
  }

  put("deriv", "*", deriv_product);

  return "done";
}

// c.
function install_exp_package() {
  function base(s) {
    return head(s);
  }

  function exponent(s) {
    return head(tail(s));
  }

  function make_exp(b, e) {
    return list("**", b, e);
  }

  function make_product(m1, m2) {
    return list("*", m1, m2);
  }

  function deriv_exp(args, variable) {
    return make_product(
      make_product(
        exponent(args),
        make_exp(base(args), make_sum(exponent(args) - 1))
      ),
      deriv(base(args), variable)
    );
  }

  put("deriv", "**", deriv_exp);

  return "done";
}

// d.
// The functions that we should change:
// put("+", "deriv", deriv_sum);
// put("*", "deriv", deriv_product);
// put("**", "deriv", deriv_exp);
