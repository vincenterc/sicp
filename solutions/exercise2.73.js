import { head, is_number, is_string, list, tail } from "sicp";
import { make_2d_table } from "./table.js";

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

  function deriv_sum(args, variable) {
    return make_sum(
      deriv(addend(args), variable),
      deriv(augend(args), variable)
    );
  }

  put("deriv", "+", deriv_sum);

  return "done";
}

function install_product_package() {
  function multiplier(s) {
    return head(s);
  }

  function multiplicand(s) {
    return head(tail(s));
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

  function deriv_exp(args, variable) {
    return make_product(
      make_product(
        exponent(args),
        make_exp(base(args), make_sum(exponent(args), -1))
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

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_sum_package();
install_product_package();
install_exp_package();

function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : get("deriv", operator(exp))(operands(exp), variable);
}

function operator(exp) {
  return head(exp);
}

function operands(exp) {
  return tail(exp);
}

function is_variable(x) {
  return is_string(x);
}

function is_same_variable(v1, v2) {
  return is_variable(v1) && is_variable(v2) && v1 === v2;
}

function make_sum(a1, a2) {
  return list("+", a1, a2);
}

function make_product(m1, m2) {
  return list("*", m1, m2);
}

export { deriv };
