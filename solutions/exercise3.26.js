import {
  equal,
  head,
  is_null,
  is_undefined,
  list,
  pair,
  set_tail,
  tail,
} from "sicp";

function make_table() {
  const local_table = list("*table*");

  function lookup(key) {
    const record = get_record(key, tail(local_table));

    return is_undefined(record) ? undefined : value(record);
  }

  function insert(key, value) {
    const record = get_record(key, tail(local_table));

    if (is_undefined(record)) {
      set_tail(
        local_table,
        insert_record(make_record(key, value), tail(local_table)),
      );
    } else {
      set_value(record, value);
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

function make_record(key, value) {
  return pair(key, value);
}

function key(record) {
  return head(record);
}

function value(record) {
  return tail(record);
}

function set_value(record, value) {
  set_tail(record, value);
}

function make_tree(entry, left, right) {
  return list(entry, left, right);
}

function entry(tree) {
  return head(tree);
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function get_record(given_key, records) {
  if (is_null(records)) {
    return undefined;
  } else {
    const current_entry = entry(records);
    const current_key = key(current_entry);

    return equal(given_key, current_key)
      ? current_entry
      : given_key < current_key
        ? get_record(given_key, left_branch(records))
        : // given_key > current_key
          get_record(given_key, right_branch(records));
  }
}

function insert_record(record, records) {
  if (is_null(records)) {
    return make_tree(record, null, null);
  } else {
    const current_entry = entry(records);
    const current_key = key(current_entry);
    const record_key = key(record);

    return record_key < current_key
      ? make_tree(
          current_entry,
          insert_record(record, left_branch(records)),
          right_branch(records),
        )
      : // record_key < current_key
        make_tree(
          current_entry,
          left_branch(records),
          insert_record(record, right_branch(records)),
        );
  }
}

export { make_table };
