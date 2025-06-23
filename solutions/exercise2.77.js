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
import { attach_tag, contents, make_2d_table, type_tag } from "./utils";

// magnitude(z)
// == apply_generic("magnitude", list(z))
// == magnitude(list(z_without_complex_tag))
// == apply_generic("magnitude", list(z_without_complex_tag))
// == magnitude(z_without_complex_rectangular_tag)
// == math_sqrt(square(real_part(z_without_complex_rectangular_tag))
//            + square(image_part(z_without_complex_rectangular_tag)))
// == 5
//
// z
// == pair("complex", pair("rectangular", pair(3, 4)))
// z_without_complex_tag
// == pair("rectangular", pair(3, 4))
// z_without_complex_rectangular_tag
// == pair(3, 4)
//
// apply_generic is invoked twice, and each time the magnitude function
// in the program environment is dispatched.

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_complex_package();
install_rectangular_package();
install_polar_package();

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

function make_complex_from_real_imag(x, y) {
  return get("make_from_real_imag", "complex")(x, y);
}

function make_complex_from_mag_ang(r, a) {
  return get("make_from_mag_ang", "complex")(r, a);
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
  put("make_from_real_imag", "complex", (x, y) =>
    tag(make_from_real_imag(x, y)),
  );
  put("real_part", list("complex"), real_part);
  put("imag_part", list("complex"), imag_part);
  put("magnitude", list("complex"), magnitude);
  put("angle", list("complex"), angle);
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
  real_part,
  imag_part,
  magnitude,
  angle,
  make_complex_from_real_imag,
  make_complex_from_mag_ang,
};
