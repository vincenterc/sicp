import {
  display,
  equal,
  head,
  is_null,
  is_pair,
  is_undefined,
  list,
  pair,
  set_tail,
  tail,
} from "sicp";

function make_table() {
  const local_table = list("*table*");

  function lookup(keys) {
    function helper(keys, table) {
      if (is_null(keys)) {
        return undefined;
      } else {
        const subtable_or_record = assoc(head(keys), tail(table));

        return is_undefined(subtable_or_record)
          ? undefined
          : !is_pair(tail(subtable_or_record)) // record
          ? is_null(tail(keys))
            ? tail(subtable_or_record)
            : undefined
          : helper(tail(keys), subtable_or_record); // subtable
      }
    }

    return helper(keys, local_table);
  }

  function kv_pairs(keys, value) {
    return is_null(tail(keys))
      ? pair(head(keys), value)
      : pair(head(keys), list(kv_pairs(tail(keys), value)));
  }

  function insert(keys, value) {
    function helper(ks, table) {
      const subtable_or_record = assoc(head(ks), tail(table));

      if (is_undefined(subtable_or_record)) {
        set_tail(table, pair(kv_pairs(ks, value), tail(table)));
      } else if (is_null(tail(ks))) {
        set_tail(subtable_or_record, value);
      } else if (!is_pair(tail(subtable_or_record))) {
        // record
        set_tail(subtable_or_record, pair(kv_pairs(tail(ks), value), null));
      } else {
        // subtable
        helper(tail(ks), subtable_or_record);
      }
    }

    helper(keys, local_table);
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

export { make_table };
