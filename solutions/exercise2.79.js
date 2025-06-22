import {
  apply_in_underlying_javascript,
  head,
  is_pair,
  is_undefined,
  list,
  map,
  math_cos,
  math_sin,
  math_sqrt,
  pair,
  tail,
} from "sicp";
import { attach_tag, contents, make_2d_table, type_tag } from "./utils.js";
import { gcd } from "./math.js";

// function is_equal(x, y) {
//   return apply_generic("is_equal", list(x, y));
// }
//
// to be included in the javascript umber package
// put(
//   "is_equal",
//   list("javascript_number", "javascript_number"),
//   (x, y) => x === y,
// );
//
// to be included in the rational package
// put(
//   "is_equal",
//   list("rational", "rational"),
//   (x, y) => numer(x) * denom(y) === denom(x) * numer(y),
// );
//
// TODO Consider the precision
// to be included in the complex package
// put(
//   "is_equal",
//   list("complex", "complex"),
//   (x, y) => real_part(x) === real_part(y) && imag_part(x) === imag_part(y),
// );

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_javascript_number_package();
install_rational_package();
install_complex_package();
install_rectangular_package();
install_polar_package();

function is_equal(x, y) {
  return apply_generic("is_equal", list(x, y));
}

function real_part(z) {
  return apply_generic("real_part", list(z));
}

function imag_part(z) {
  return apply_generic("imag_part", list(z));
}

function magnitude(z) {
  return apply_generic("magnitude", list(z));
}

function angle(z) {
  return apply_generic("angle", list(z));
}

function make_javascript_number(n) {
  return get("make", "javascript_number")(n);
}

function make_rational(n, d) {
  return get("make", "rational")(n, d);
}

function make_complex_from_real_imag(x, y) {
  return get("make_from_real_imag", "complex")(x, y);
}

function make_complex_from_mag_ang(r, a) {
  return get("make_from_mag_ang", "complex")(r, a);
}

function install_javascript_number_package() {
  function tag(x) {
    return attach_tag("javascript_number", x);
  }

  put("add", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x + y),
  );
  put("sub", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x - y),
  );
  put("mul", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x * y),
  );
  put("div", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x / y),
  );
  // is_equal
  put(
    "is_equal",
    list("javascript_number", "javascript_number"),
    (x, y) => x === y,
  );
  put("make", "javascript_number", (x) => tag(x));

  return "done";
}

function install_rational_package() {
  // internal functions
  function numer(x) {
    return head(x);
  }

  function denom(x) {
    return tail(x);
  }

  function make_rat(n, d) {
    const g = gcd(n, d);
    return pair(n / g, d / g);
  }

  function add_rat(x, y) {
    return make_rat(
      numer(x) * denom(y) + numer(y) * denom(x),
      denom(x) * denom(y),
    );
  }

  function sub_rat(x, y) {
    return make_rat(
      numer(x) * denom(y) - numer(y) * denom(x),
      denom(x) * denom(y),
    );
  }

  function mul_rat(x, y) {
    return make_rat(numer(x) * numer(y), denom(x) * denom(y));
  }

  function div_rat(x, y) {
    return make_rat(numer(x) * denom(y), denom(x) * numer(y));
  }

  // interface to rest of the system
  function tag(x) {
    return attach_tag("rational", x);
  }

  put("add", list("rational", "rational"), (x, y) => tag(add_rat(x, y)));
  put("sub", list("rational", "rational"), (x, y) => tag(sub_rat(x, y)));
  put("mul", list("rational", "rational"), (x, y) => tag(mul_rat(x, y)));
  put("div", list("rational", "rational"), (x, y) => tag(div_rat(x, y)));
  // is_equal
  put(
    "is_equal",
    list("rational", "rational"),
    (x, y) => numer(x) * denom(y) === denom(x) * numer(y),
  );
  put("make", "rational", (n, d) => tag(make_rat(n, d)));

  return "done";
}

function install_complex_package() {
  // imported functions from rectangular and polar packages
  function make_from_real_imag(x, y) {
    return get("make_from_real_imag", "rectangular")(x, y);
  }

  function make_from_mag_ang(r, a) {
    return get("make_from_mag_ang", "polar")(r, a);
  }

  // internal functions
  function add_complex(z1, z2) {
    return make_from_real_imag(
      real_part(z1) + real_part(z2),
      imag_part(z1) + imag_part(z2),
    );
  }

  function sub_complex(z1, z2) {
    return make_from_real_imag(
      real_part(z1) - real_part(z2),
      imag_part(z1) - imag_part(z2),
    );
  }

  function mul_complex(z1, z2) {
    return make_from_mag_ang(
      magnitude(z1) * magnitude(z2),
      angle(z1) + angle(z2),
    );
  }

  function div_complex(z1, z2) {
    return make_from_mag_ang(
      magnitude(z1) / magnitude(z2),
      angle(z1) - angle(z2),
    );
  }

  // interface to rest of the system
  function tag(z) {
    return attach_tag("complex", z);
  }

  put("add", list("complex", "complex"), (z1, z2) => tag(add_complex(z1, z2)));
  put("sub", list("complex", "complex"), (z1, z2) => tag(sub_complex(z1, z2)));
  put("mul", list("complex", "complex"), (z1, z2) => tag(mul_complex(z1, z2)));
  put("div", list("complex", "complex"), (z1, z2) => tag(div_complex(z1, z2)));
  // is_equal
  put(
    "is_equal",
    list("complex", "complex"),
    (x, y) => real_part(x) === real_part(y) && imag_part(x) === imag_part(y),
  );
  put("real_part", list("complex"), real_part);
  put("imag_part", list("complex"), imag_part);
  put("magnitude", list("complex"), magnitude);
  put("angle", list("complex"), angle);
  put("make_from_real_imag", "complex", (x, y) =>
    tag(make_from_real_imag(x, y)),
  );
  put("make_from_mag_ang", "complex", (r, a) => tag(make_from_mag_ang(r, a)));

  return "done";
}

function install_rectangular_package() {
  // internal functions
  function real_part(z) {
    return head(z);
  }

  function imag_part(z) {
    return tail(z);
  }

  function make_from_real_imag(x, y) {
    return pair(x, y);
  }

  function magnitude(z) {
    return math_sqrt(square(real_part(z)) + square(imag_part(z)));
  }

  function angle(z) {
    return math_atan2(imag_part(z), real_part(z));
  }

  function make_from_mag_ang(r, a) {
    return pair(r * math_cos(a), r * math_sin(a));
  }

  // interface to the rest of the system
  function tag(x) {
    return attach_tag("rectangular", x);
  }

  put("real_part", list("rectangular"), real_part);
  put("imag_part", list("rectangular"), imag_part);
  put("magnitude", list("rectangular"), magnitude);
  put("angle", list("rectangular"), angle);
  put("make_from_real_imag", "rectangular", (x, y) =>
    tag(make_from_real_imag(x, y)),
  );
  put("make_from_mag_ang", "rectangular", (r, a) =>
    tag(make_from_mag_ang(r, a)),
  );

  return "done";
}

function install_polar_package() {
  // internal functions
  function magnitude(z) {
    return head(z);
  }

  function angle(z) {
    return tail(z);
  }

  function make_from_mag_ang(r, a) {
    return pair(r, a);
  }

  function real_part(z) {
    return magnitude(z) * math_cos(angle(z));
  }

  function imag_part(z) {
    return magnitude(z) * math_sin(angle(z));
  }

  function make_from_real_imag(x, y) {
    return pair(math_sqrt(square(x) + square(y)), math_atan2(y, x));
  }

  // interface to the rest of the system
  function tag(x) {
    return attach_tag("polar", x);
  }

  put("real_part", list("polar"), real_part);
  put("imag_part", list("polar"), imag_part);
  put("magnitude", list("polar"), magnitude);
  put("angle", list("polar"), angle);
  put("make_from_real_imag", "polar", (x, y) => tag(make_from_real_imag(x, y)));
  put("make_from_mag_ang", "polar", (r, a) => tag(make_from_mag_ang(r, a)));

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
  is_equal,
  make_javascript_number,
  make_rational,
  make_complex_from_real_imag,
  make_complex_from_mag_ang,
};
