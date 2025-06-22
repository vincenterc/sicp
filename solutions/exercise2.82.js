import {
  map,
  apply_in_underlying_javascript,
  list,
  error,
  pair,
  head,
  is_undefined,
  tail,
  math_cos,
  math_sin,
  math_sqrt,
  math_atan2,
  is_null,
} from "sicp";
import {
  attach_tag,
  contents,
  identity,
  make_2d_table,
  type_tag,
} from "./utils.js";
import { square } from "./math.js";

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);

  function can_transform(funcs) {
    return is_null(funcs)
      ? true
      : is_undefined(head(funcs))
        ? false
        : can_transform(tail(funcs));
  }

  function transform_functions(types) {
    function get_funcs(target_type) {
      return map(
        (type) =>
          type === target_type ? identity : get_coercion(type, target_type),
        type_tags,
      );
    }

    if (is_null(types)) {
      return null;
    } else {
      const funcs = get_funcs(head(types));

      return can_transform(funcs)
        ? funcs
        : transform_functions(tail(types));
    }
  }

  function args_transformed(funcs, as) {
    return is_null(as)
      ? null
      : pair(head(funcs)(head(as)), args_transformed(tail(funcs), tail(as)));
  }

  if (!is_undefined(fun)) {
    return apply_in_underlying_javascript(fun, map(contents, args));
  } else {
    const transform_funcs = transform_functions(type_tags);

    return !is_null(transform_funcs)
      ? apply_generic(op, args_transformed(transform_funcs, args))
      : error(list(op, type_tags), "no method for these types");
  }
}

// Suppose there are three types: A, B, and C, where B can be transformed to
// C, and there is an operation for (A, C, C). When using the mentioned
// strategy, applying apply_generic to (A, B, C) will only try (A, B, C),
// (A, A, A), (B, B, B) and (C, C, C). However, since B can be transformed
// to C, it is possible to use the operation for (A, C, C).

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");
const table_coercion = make_2d_table();
const get_coercion = table_coercion("lookup");
const put_coercion = table_coercion("insert");

install_javascript_number_package();
install_complex_package();
install_rectangular_package();
install_polar_package();
install_coercion_package();

function add_3(x, y, z) {
  return apply_generic("add", list(x, y, z));
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

function make_complex_from_real_imag(x, y) {
  return get("make_from_real_imag", "complex")(x, y);
}

function install_javascript_number_package() {
  function tag(x) {
    return attach_tag("javascript_number", x);
  }

  put("add", list("javascript_number", "javascript_number"), (x, y) =>
    tag(x + y),
  );
  put(
    "add",
    list("javascript_number", "javascript_number", "javascript_number"),
    (x, y, z) => tag(x + y + z),
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
  put("make", "javascript_number", (x) => tag(x));

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
  put("add", list("complex", "complex", "complex"), (z1, z2, z3) =>
    tag(add_complex(add_complex(z1, z2), z3)),
  );
  put("sub", list("complex", "complex"), (z1, z2) => tag(sub_complex(z1, z2)));
  put("mul", list("complex", "complex"), (z1, z2) => tag(mul_complex(z1, z2)));
  put("div", list("complex", "complex"), (z1, z2) => tag(div_complex(z1, z2)));
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

function install_coercion_package() {
  function javascript_number_to_complex(n) {
    return make_complex_from_real_imag(contents(n), 0);
  }

  put_coercion("javascript_number", "complex", javascript_number_to_complex);
}

export { add_3, make_javascript_number, make_complex_from_real_imag };
