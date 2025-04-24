import { math_round } from "sicp";

const tower_of_types = list("integer", "rational", "real", "complex");

function install_project_package() {
  put("project", "complex", (n) => make_real(real_part(n)));
  put("project", "real", (n) => {
    // TODO No function in js is like the "rationalize" function in scheme.
    const denominator = 100000;
    const numerator = math_round(n * denominator);
    const g = gcd(numerator, denominator);

    return make_rational(numerator / g, denominator / g);
  });
  put("project", "rational", (n) => make_integer(numer(n) / denom(n)));

  return "done";
}

function project(n) {
  const type = type_tag(n);

  return get("project", type)(contents(n));
}

function drop(n) {
  if (get_type_level(type_tag(n)) === 0) {
    return n;
  } else {
    const n_projected = project(n);

    return is_equal(n_projected, raise(n_projected)) ? drop(n_projected) : n;
  }
}

function get_type_level(type) {
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
    return drop(apply(fun, map(contents, args)));
  } else {
    if (length(args) === 2) {
      const type1 = head(type_tags);
      const type2 = head(tail(type_tags));
      const level_of_type1 = get_type_level(type1);
      const level_of_type2 = get_type_level(type2);
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
