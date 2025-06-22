import {
  apply_in_underlying_javascript,
  error,
  head,
  is_undefined,
  list,
  map,
  pair,
  tail,
} from "sicp";
import { attach_tag, contents, make_2d_table, type_tag } from "./utils.js";
import { gcd } from "./math.js";

function install_raise_package() {
  // TODO Same code as in install_rational_package
  function numer(x) {
    return head(x);
  }

  function denom(x) {
    return tail(x);
  }

  put("raise", list("integer"), (x) => make_rational(x, 1));
  put("raise", list("rational"), (x) => make_real(numer(x) / denom(x)));
  put("raise", list("real"), (x) => make_complex_from_real_imag(x, 0));

  return "done";
}

function raise(n) {
  return apply_generic("raise", list(n));
}

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_integer_package();
install_rational_package();
install_real_package();
install_complex_package();
install_rectangular_package();
install_raise_package();

function make_integer(n) {
  return get("make", "integer")(n);
}

function make_rational(n, d) {
  return get("make", "rational")(n, d);
}

function make_real(n) {
  return get("make", "real")(n);
}

function make_complex_from_real_imag(x, y) {
  return get("make_from_real_imag", "complex")(x, y);
}

function install_integer_package() {
  function tag(x) {
    return attach_tag("integer", x);
  }

  put("make", "integer", (x) => tag(x));

  return "done";
}

function install_rational_package() {
  function make_rat(n, d) {
    const g = gcd(n, d);
    return pair(n / g, d / g);
  }

  function tag(x) {
    return attach_tag("rational", x);
  }

  put("make", "rational", (n, d) => tag(make_rat(n, d)));

  return "done";
}

function install_real_package() {
  function tag(x) {
    return attach_tag("real", x);
  }

  put("make", "real", (x) => tag(x));

  return "done";
}

function install_complex_package() {
  function make_from_real_imag(x, y) {
    return get("make_from_real_imag", "rectangular")(x, y);
  }

  function tag(z) {
    return attach_tag("complex", z);
  }

  put("make_from_real_imag", "complex", (x, y) =>
    tag(make_from_real_imag(x, y)),
  );

  return "done";
}

function install_rectangular_package() {
  function make_from_real_imag(x, y) {
    return pair(x, y);
  }

  function tag(x) {
    return attach_tag("rectangular", x);
  }

  put("make_from_real_imag", "rectangular", (x, y) =>
    tag(make_from_real_imag(x, y)),
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

export {
  raise,
  make_integer,
  make_rational,
  make_real,
  make_complex_from_real_imag,
};
