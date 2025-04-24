import { head, is_null, is_undefined, pair, tail } from "sicp";
import { identity } from "./utils.js";

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

  function get_transform_functions(types) {
    function get_funcs(target_type) {
      return map(
        (type) =>
          type === target_type ? identity : get_coercion(type, target_type),
        type_tags
      );
    }

    if (is_null(types)) {
      return null;
    } else {
      const funcs = get_funcs(head(types));

      return can_transform(funcs) ? funcs : helper(tail(types));
    }
  }

  function args_transformed(funcs, as) {
    return is_null(as)
      ? null
      : pair(head(funcs)(head(as)), args_transformed(tail(funcs), tail(as)));
  }

  if (!is_undefined(fun)) {
    return apply(fun, map(contents, args));
  } else {
    const transform_functions = get_transform_functions(type_tags);

    return !is_null(transform_functions)
      ? apply_generic(op, args_transformed(transform_functions, args))
      : error(list(op, type_tags), "no method for these types");
  }
}

// If there are three types A, B and C where B can be transformed to C,
// and there is a operation for (A, C, C). Applying apply_generic to
// (A, B, C) will only try (A, B, C), (A, A, A), (B, B, B) and (C, C, C),
// but you can transform B to C and use the operation for (A, C, C).
