import { error, head, is_number, is_pair, pair, tail } from "sicp";

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

function attach_tag(type_tag, contents) {
  return is_number(contents) ? contents : pair(type_tag, contents);
}
