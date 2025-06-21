import {
  error,
  head,
  is_null,
  is_undefined,
  list,
  pair,
  set_tail,
  tail,
} from "sicp";

function make_table(same_key) {
  const local_table = list("*table*");

  function assoc(key, records) {
    return is_null(records)
      ? undefined
      : same_key(key, head(head(records)))
        ? head(records)
        : assoc(key, tail(records));
  }

  function lookup(key) {
    const record = assoc(key, tail(local_table));

    return is_undefined(record) ? undefined : tail(record);
  }

  function insert(key, value) {
    const record = assoc(key, tail(local_table));

    if (is_undefined(record)) {
      set_tail(local_table, pair(pair(key, value), tail(local_table)));
    } else {
      set_tail(record, value);
    }

    return "ok";
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

export { make_table };
