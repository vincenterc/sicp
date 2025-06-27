import {
  accumulate,
  apply_in_underlying_javascript,
  head,
  is_null,
  is_undefined,
  list,
  map,
  pair,
  tail,
} from "sicp";
import { make_2d_table } from "./utils.js";
import { attach_tag, contents, type_tag } from "./exercise2.78.js";

// to be included in the polynomial package
// put("is_equal_to_zero", list("polynomial"), (p) =>
//   accumulate(
//     (t, res) => (res ? is_equal_to_zero(coeff(t)) : res),
//     true,
//     term_list(p),
//   ),
// );

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_javascript_number_package();
install_polynomial_package();

function is_equal_to_zero(x) {
  return apply_generic("is_equal_to_zero", list(x));
}

function make_polynomial(variable, terms) {
  return get("make", "polynomial")(variable, terms);
}

function install_javascript_number_package() {
  put("is_equal_to_zero", list("javascript_number"), (x) => x === 0);

  return "done";
}

function install_polynomial_package() {
  function make_poly(variable, term_list) {
    return pair(variable, term_list);
  }

  function term_list(p) {
    return tail(p);
  }

  function first_term(term_list) {
    return head(term_list);
  }

  function rest_terms(term_list) {
    return tail(term_list);
  }

  function coeff(term) {
    return head(tail(term));
  }

  function is_equal_to_zero_poly(p) {
    function helper(terms) {
      return is_null(terms)
        ? true
        : is_equal_to_zero(coeff(first_term(terms)))
          ? helper(rest_terms(terms))
          : false;
    }

    return helper(term_list(p));
  }

  function tag(p) {
    return attach_tag("polynomial", p);
  }

  put("is_equal_to_zero", list("polynomial"), is_equal_to_zero_poly);
  put("make", "polynomial", (variable, terms) =>
    tag(make_poly(variable, terms)),
  );

  return "done";
}

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  return !is_undefined(fun)
    ? apply_in_underlying_javascript(fun, map(contents, args))
    : error(list(op, type_tags), "no method for these types -- apply_generic");
}

export { is_equal_to_zero, make_polynomial };
