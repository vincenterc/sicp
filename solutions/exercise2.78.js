import {
  apply_in_underlying_javascript,
  error,
  head,
  is_number,
  is_pair,
  is_undefined,
  list,
  map,
  pair,
  tail,
} from "sicp";
import { make_2d_table } from "./table.js";

function attach_tag(type_tag, contents) {
  return is_number(contents) ? contents : pair(type_tag, contents);
}

function type_tag(datum) {
  return is_number(datum)
    ? "javascript_number"
    : is_pair(datum)
      ? head(datum)
      : error(datum, "bad tagged datum -- type_tag");
}

function contents(datum) {
  return is_number(datum)
    ? datum
    : is_pair(datum)
      ? tail(datum)
      : error(datum, "bad tagged datum -- contents");
}

const table = make_2d_table();
const get = table("lookup");
const put = table("insert");

install_javascript_number_package();

function add(x, y) {
  return apply_generic("add", list(x, y));
}

function sub(x, y) {
  return apply_generic("sub", list(x, y));
}

function mul(x, y) {
  return apply_generic("mul", list(x, y));
}

function div(x, y) {
  return apply_generic("div", list(x, y));
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

  return "done";
}

function apply_generic(op, args) {
  const type_tags = map(type_tag, args);
  const fun = get(op, type_tags);
  return !is_undefined(fun)
    ? apply_in_underlying_javascript(fun, map(contents, args))
    : error(list(op, type_tags), "no method for these types -- apply_generic");
}

export { add };
