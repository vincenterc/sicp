import {
  apply_in_underlying_javascript,
  display,
  error,
  head,
  is_null,
  is_string,
  is_undefined,
  list,
  map,
  pair,
  tail,
} from "sicp";
import { make_2d_table } from "./utils.js";
import { attach_tag, contents, type_tag } from "./exercise2.78.js";

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_javascript_number_package();
install_rational_package();
install_polynomial_package();

function add(x, y) {
  return apply_generic("add", list(x, y));
}

function mul(x, y) {
  return apply_generic("mul", list(x, y));
}

function div(x, y) {
  return apply_generic("div", list(x, y));
}

function negate(x) {
  return apply_generic("negate", list(x));
}

function greatest_common_divisor(x, y) {
  return apply_generic("gcd", list(x, y));
}

function is_equal_to_zero(x) {
  return apply_generic("is_equal_to_zero", list(x));
}

function make_rational(n, d) {
  return get("make", "rational")(n, d);
}

function make_polynomial(variable, terms) {
  return get("make", "polynomial")(variable, terms);
}

function make_term(order, coeff) {
  return get("make_term", "polynomial")(order, coeff);
}

function install_javascript_number_package() {
  function gcd(x, y) {
    return y === 0 ? x : gcd(y, x % y);
  }

  function tag(x) {
    return attach_tag("javascript_number", x);
  }

  put("add", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x + y),
  );
  put("mul", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x * y),
  );
  put("div", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x / y),
  );
  put("negate", list("javascript_number"), (x) => tag(-x));
  put("gcd", list("javascript_number", "javascript_number"), gcd);
  put("is_equal_to_zero", list("javascript_number"), (x) => x === 0);

  return "done";
}

function install_rational_package() {
  function numer(x) {
    return head(x);
  }

  function denom(x) {
    return tail(x);
  }

  function make_rat(n, d) {
    return pair(n, d);
  }

  function add_rat(x, y) {
    return make_rat(
      add(mul(numer(x), denom(y)), mul(numer(y), denom(x))),
      mul(denom(x), denom(y)),
    );
  }

  function mul_rat(x, y) {
    return make_rat(mul(numer(x), numer(y)), mul(denom(x), denom(y)));
  }

  function div_rat(x, y) {
    return make_rat(mul(numer(x), denom(y)), mul(denom(x), numer(y)));
  }

  function negate_rat(x) {
    return make_rat(negate(numer(x)), denom(x));
  }

  function tag(x) {
    return attach_tag("rational", x);
  }

  put("add", list("rational", "rational"), (x, y) => tag(add_rat(x, y)));
  put("mul", list("rational", "rational"), (x, y) => tag(mul_rat(x, y)));
  put("div", list("rational", "rational"), (x, y) => tag(div_rat(x, y)));
  put("negate", list("rational"), (x) => tag(negate_rat(x)));
  put("is_equal_to_zero", list("rational"), (x) => numer(x) === 0);
  put("make", "rational", (n, d) => tag(make_rat(n, d)));

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
    return is_equal_to_zero(coeff(term)) ? term_list : pair(term, term_list);
  }

  const the_empty_termlist = null;

  function first_term(term_list) {
    return head(term_list);
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

  function mul_poly(p1, p2) {
    return is_same_variable(variable(p1), variable(p2))
      ? make_poly(variable(p1), mul_terms(term_list(p1), term_list(p2)))
      : error(list(p1, p2), "polys not in same var -- mul_poly");
  }

  function mul_terms(L1, L2) {
    return is_empty_termlist(L1)
      ? the_empty_termlist
      : add_terms(
          mul_term_by_all_terms(first_term(L1), L2),
          mul_terms(rest_terms(L1), L2),
        );
  }

  function mul_term_by_all_terms(t1, L) {
    if (is_empty_termlist(L)) {
      return the_empty_termlist;
    } else {
      const t2 = first_term(L);

      return adjoin_term(
        make_term(order(t1) + order(t2), mul(coeff(t1), coeff(t2))),
        mul_term_by_all_terms(t1, rest_terms(L)),
      );
    }
  }

  function div_poly(p1, p2) {
    const v_p1 = variable(p1);
    const v_p2 = variable(p2);

    if (is_same_variable(v_p1, v_p2)) {
      const result_list = div_terms(term_list(p1), term_list(p2));
      const quotient = head(result_list);
      const remainder = head(tail(result_list));

      return list(make_poly(v_p1, quotient), make_poly(v_p1, remainder));
    } else {
      return error(list(p1, p2), "polys not in same var -- div_poly");
    }
  }

  function div_terms(L1, L2) {
    if (is_empty_termlist(L1)) {
      return list(the_empty_termlist, the_empty_termlist);
    } else {
      const t1 = first_term(L1);
      const t2 = first_term(L2);

      if (order(t2) > order(t1)) {
        return list(the_empty_termlist, L1);
      } else {
        const new_c = div(coeff(t1), coeff(t2));
        const new_o = order(t1) - order(t2);
        const new_term = make_term(new_o, new_c);
        const rest_of_result = div_terms(
          add_terms(L1, negate_terms(mul_terms(list(new_term), L2))),
          L2,
        );

        return list(
          adjoin_term(new_term, head(rest_of_result)),
          head(tail(rest_of_result)),
        );
      }
    }
  }

  function negate_poly(p) {
    return make_poly(variable(p), negate_terms(term_list(p)));
  }

  function negate_terms(L) {
    return map((t) => make_term(order(t), negate(coeff(t))), L);
  }

  function gcd_poly(p1, p2) {
    return is_same_variable(variable(p1), variable(p2))
      ? make_poly(variable(p1), gcd_terms(term_list(p1), term_list(p2)))
      : error(list(p1, p2), "polys not in same var -- gcd_poly");
  }

  function gcd_terms(a, b) {
    return is_empty_termlist(b) ? a : gcd_terms(b, remainder_terms(a, b));
  }

  function remainder_terms(L1, L2) {
    return head(tail(div_terms(L1, L2)));
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
  put("mul", list("polynomial", "polynomial"), (p1, p2) =>
    tag(mul_poly(p1, p2)),
  );
  put("div", list("polynomial", "polynomial"), (p1, p2) => {
    const result = div_poly(p1, p2);
    return list(tag(head(result)), tag(head(tail(result))));
  });
  put("negate", list("polynomial"), (p) => tag(negate_poly(p)));
  put("gcd", list("polynomial", "polynomial"), (p1, p2) =>
    tag(gcd_poly(p1, p2)),
  );
  put("is_equal_to_zero", list("polynomial"), is_equal_to_zero_poly);
  put("make", "polynomial", (variable, terms) =>
    tag(make_poly(variable, terms)),
  );
  put("make_term", "polynomial", make_term);

  return "done";
}

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  return !is_undefined(fun)
    ? apply_in_underlying_javascript(fun, map(contents, args))
    : error(list(op, type_tags), "no method for these types -- apply_generic");
}

const p1 = make_polynomial(
  "x",
  list(make_term(2, 1), make_term(1, -2), make_term(0, 1)),
);
const p2 = make_polynomial("x", list(make_term(2, 11), make_term(0, 7)));
const p3 = make_polynomial("x", list(make_term(1, 13), make_term(0, 5)));
const q1 = mul(p1, p2);
const q2 = mul(p1, p3);

display(greatest_common_divisor(q1, q2));
// ["polynomial", ["x", [[0, [1.100410578432558, null]], null]]]
