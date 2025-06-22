import {
  apply_in_underlying_javascript,
  error,
  head,
  is_null,
  is_pair,
  is_undefined,
  length,
  list,
  map,
  math_round,
  pair,
  tail,
} from "sicp";
import { attach_tag, contents, make_2d_table, type_tag } from "./utils.js";
import { gcd } from "./math.js";

const tower_of_types = list("integer", "rational", "real", "complex");

function install_project_package() {
  // TODO Same code as in install_rational_package
  function numer(x) {
    return head(x);
  }

  function denom(x) {
    return tail(x);
  }

  put("project", list("complex"), (n) => make_real(real_part(n)));
  put("project", list("real"), (n) => {
    return make_integer(math_round(n));
  });
  put("project", list("rational"), (n) => make_integer(numer(n) / denom(n)));

  return "done";
}

function project(n) {
  return apply_generic("project", list(n));
}

function drop(n) {
  const type = type_tag(n);

  function raise_to(x, t) {
    const x_raised = raise(x);

    return type_tag(x_raised) === t ? x_raised : raise_to(x_raised, t);
  }

  if (type_level(type) === 0) {
    return n;
  } else {
    const n_projected = project(n);

    return is_equal(n, raise_to(n_projected, type)) ? drop(n_projected) : n;
  }
}

function type_level(type) {
  function iter(tower, level) {
    return is_null(tower)
      ? undefined
      : type === head(tower)
        ? level
        : iter(tail(tower), level + 1);
  }

  return iter(tower_of_types, 0);
}

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);

  if (!is_undefined(fun)) {
    const result = apply_in_underlying_javascript(fun, map(contents, args));

    return is_pair(result) && op !== "raise" && op !== "project"
      ? drop(result)
      : result;
  } else {
    if (length(args) === 2) {
      const type1 = head(type_tags);
      const type2 = head(tail(type_tags));
      const level_of_type1 = type_level(type1);
      const level_of_type2 = type_level(type2);
      const a1 = head(args);
      const a2 = head(tail(args));

      return is_undefined(level_of_type1) || is_undefined(level_of_type2)
        ? error(list(op, type_tags), "no method for these types")
        : level_of_type1 > level_of_type2
          ? apply_generic(op, list(a1, raise(a2)))
          : level_of_type1 < level_of_type2
            ? apply_generic(op, list(raise(a1), a2))
            : error(list(op, type_tags), "no method for these types");
    } else {
      return error(list(op, type_tags), "no method for these types");
    }
  }
}

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_integer_package();
install_rational_package();
install_real_package();
install_complex_package();
install_rectangular_package();
install_is_equal_package();
install_raise_package();
install_project_package();

function add(x, y) {
  return apply_generic("add", list(x, y));
}

function real_part(z) {
  return apply_generic("real_part", list(z));
}

function imag_part(z) {
  return apply_generic("imag_part", list(z));
}

function is_equal(x, y) {
  return apply_generic("is_equal", list(x, y));
}

function raise(n) {
  return apply_generic("raise", list(n));
}

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

  put("add", list("integer", "integer"), (x, y) => tag(x + y));
  put("make", "integer", (x) => tag(x));

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
    const g = gcd(n, d);
    return pair(n / g, d / g);
  }

  function tag(x) {
    return attach_tag("rational", x);
  }

  function add_rat(x, y) {
    return make_rat(
      numer(x) * denom(y) + numer(y) * denom(x),
      denom(x) * denom(y),
    );
  }

  put("add", list("rational", "rational"), (x, y) => tag(add_rat(x, y)));
  put("make", "rational", (n, d) => tag(make_rat(n, d)));

  return "done";
}

function install_real_package() {
  function tag(x) {
    return attach_tag("real", x);
  }

  put("add", list("real", "real"), (x, y) => tag(x + y));
  put("make", "real", (x) => tag(x));

  return "done";
}

function install_complex_package() {
  function make_from_real_imag(x, y) {
    return get("make_from_real_imag", "rectangular")(x, y);
  }

  function add_complex(z1, z2) {
    return make_from_real_imag(
      real_part(z1) + real_part(z2),
      imag_part(z1) + imag_part(z2),
    );
  }

  function tag(z) {
    return attach_tag("complex", z);
  }

  put("add", list("complex", "complex"), (z1, z2) => tag(add_complex(z1, z2)));
  put("make_from_real_imag", "complex", (x, y) =>
    tag(make_from_real_imag(x, y)),
  );

  return "done";
}

function install_rectangular_package() {
  function real_part(z) {
    return head(z);
  }

  function imag_part(z) {
    return tail(z);
  }

  function make_from_real_imag(x, y) {
    return pair(x, y);
  }

  function tag(x) {
    return attach_tag("rectangular", x);
  }

  put("real_part", list("rectangular"), real_part);
  put("imag_part", list("rectangular"), imag_part);
  put("make_from_real_imag", "rectangular", (x, y) =>
    tag(make_from_real_imag(x, y)),
  );

  return "done";
}

function install_is_equal_package() {
  // TODO Same code as in install_rational_package
  function numer(x) {
    return head(x);
  }

  function denom(x) {
    return tail(x);
  }

  put("is_equal", list("integer", "integer"), (x, y) => x === y);
  put(
    "is_equal",
    list("rational", "rational"),
    (x, y) => numer(x) * denom(y) === denom(x) * numer(y),
  );
  put("is_equal", list("real", "real"), (x, y) => x === y);
  put(
    "is_equal",
    list("complex", "complex"),
    (x, y) => real_part(x) === real_part(y) && imag_part(x) === imag_part(y),
  );
}

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

export {
  drop,
  add,
  make_integer,
  make_rational,
  make_real,
  make_complex_from_real_imag,
};
