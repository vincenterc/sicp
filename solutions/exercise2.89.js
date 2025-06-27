import {
  apply_in_underlying_javascript,
  error,
  head,
  is_null,
  is_string,
  is_undefined,
  length,
  list,
  map,
  pair,
  tail,
} from "sicp";
import { make_2d_table } from "./utils.js";
import { attach_tag, contents, type_tag } from "./exercise2.78.js";

// Modify functions below:
// function adjoin_term(term, term_list) {
//   return is_equal_to_zero(coeff(term))
//     ? term_list
//     : order(term) === length(term_list)
//       ? pair(coeff(term), term_list)
//       : adjoin_term(term, pair(0, term_list));
// }
// function first_term(term_list) {
//   return make_term(length(term_list) - 1, head(term_list));
// }

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_javascript_number_package();
install_polynomial_package();

function add(x, y) {
  return apply_generic("add", list(x, y));
}

function is_equal_to_zero(x) {
  return apply_generic("is_equal_to_zero", list(x));
}

function make_polynomial(variable, terms) {
  return get("make", "polynomial")(variable, terms);
}

function install_javascript_number_package() {
  function tag(x) {
    return attach_tag("javascript_number", x);
  }

  put("add", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x + y),
  );
  put("is_equal_to_zero", list("javascript_number"), (x) => x === 0);

  return "done";
}

function install_polynomial_package() {
  function make_poly(variable, term_list) {
    return pair(variable, term_list);
  }

  function variable(p) {
    return head(p);
  }
  function term_list(p) {
    return tail(p);
  }

  function is_variable(x) {
    return is_string(x);
  }

  function is_same_variable(v1, v2) {
    return is_variable(v1) && is_variable(v2) && v1 === v2;
  }

  function adjoin_term(term, term_list) {
    return is_equal_to_zero(coeff(term))
      ? term_list
      : order(term) === length(term_list)
        ? pair(coeff(term), term_list)
        : adjoin_term(term, pair(0, term_list));
  }

  const the_empty_termlist = null;

  function first_term(term_list) {
    return make_term(length(term_list) - 1, head(term_list));
  }

  function rest_terms(term_list) {
    return tail(term_list);
  }

  function is_empty_termlist(term_list) {
    return is_null(term_list);
  }

  function make_term(order, coeff) {
    return list(order, coeff);
  }

  function order(term) {
    return head(term);
  }

  function coeff(term) {
    return head(tail(term));
  }

  function add_poly(p1, p2) {
    return is_same_variable(variable(p1), variable(p2))
      ? make_poly(variable(p1), add_terms(term_list(p1), term_list(p2)))
      : error(list(p1, p2), "polys not in same var -- add_poly");
  }

  function add_terms(L1, L2) {
    if (is_empty_termlist(L1)) {
      return L2;
    } else if (is_empty_termlist(L2)) {
      return L1;
    } else {
      const t1 = first_term(L1);
      const t2 = first_term(L2);

      return order(t1) > order(t2)
        ? adjoin_term(t1, add_terms(rest_terms(L1), L2))
        : order(t1) < order(t2)
          ? adjoin_term(t2, add_terms(L1, rest_terms(L2)))
          : adjoin_term(
              make_term(order(t1), add(coeff(t1), coeff(t2))),
              add_terms(rest_terms(L1), rest_terms(L2)),
            );
    }
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

  put("add", list("polynomial", "polynomial"), (p1, p2) =>
    tag(add_poly(p1, p2)),
  );
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

export { add, make_polynomial, is_equal_to_zero };
