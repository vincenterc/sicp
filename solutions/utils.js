import {
  equal,
  error,
  head,
  is_null,
  is_pair,
  is_undefined,
  list,
  pair,
  set_tail,
  tail,
} from "sicp";

function identity(x) {
  return x;
}

function make_2d_table() {
  const local_table = list("*table*");

  function lookup(key_1, key_2) {
    const subtable = assoc(key_1, tail(local_table));

    if (is_undefined(subtable)) {
      return undefined;
    } else {
      const record = assoc(key_2, tail(subtable));

      return is_undefined(record) ? undefined : tail(record);
    }
  }

  function insert(key_1, key_2, value) {
    const subtable = assoc(key_1, tail(local_table));

    if (is_undefined(subtable)) {
      set_tail(
        local_table,
        pair(list(key_1, pair(key_2, value)), tail(local_table)),
      );
    } else {
      const record = assoc(key_2, tail(subtable));

      if (is_undefined(record)) {
        set_tail(subtable, pair(pair(key_2, value), tail(subtable)));
      } else {
        set_tail(record, value);
      }
    }
  }

  function dispatch(m) {
    return m === "lookup"
      ? lookup
      : m === "insert"
        ? insert
        : error(m, "unknown operation -- table");
  }

  return dispatch;
}

function assoc(key, records) {
  return is_null(records)
    ? undefined
    : equal(key, head(head(records)))
      ? head(records)
      : assoc(key, tail(records));
}

function attach_tag(type_tag, contents) {
  return pair(type_tag, contents);
}

function type_tag(datum) {
  return is_pair(datum)
    ? head(datum)
    : error(datum, "bad tagged datum -- type_tag");
}

function contents(datum) {
  return is_pair(datum)
    ? tail(datum)
    : error(datum, "bad tagged datum -- contents");
}

export { identity, make_2d_table, attach_tag, type_tag, contents };
