// a.
// It will loop infinitely if we call exp with two complex numbers
// as arguments.

// b.
// Louis is wrong. Nothing had to be done about coercion with arguments
// of the same type.

// c.
function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);

  if (!is_undefined(fun)) {
    return apply(fun, map(contents, args));
  } else {
    if (length(args) === 2) {
      const type1 = head(type_tags);
      const type2 = head(tail(type_tags));

      if (type1 === type2) {
        return error(list(op, type_tags), "no method for these types");
      } else {
        const a1 = head(args);
        const a2 = head(tail(args));
        const t1_to_t2 = get_coercion(type1, type2);
        const t2_to_t1 = get_coercion(type2, type1);

        return !is_undefined(t1_to_t2)
          ? apply_generic(op, list(t1_to_t2(a1), a2))
          : !is_undefined(t2_to_t1)
            ? apply_generic(op, list(a1, t2_to_t1(a2)))
            : error(list(op, type_tags), "no method for these types");
      }
    } else {
      return error(list(op, type_tags), "no method for these types");
    }
  }
}
