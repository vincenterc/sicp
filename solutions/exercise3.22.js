import { display, error, head, is_null, pair, set_tail, tail } from "sicp";

function make_queue() {
  let front_ptr = null;
  let rear_ptr = null;

  function is_empty() {
    return is_null(front_ptr);
  }

  function front() {
    return is_empty()
      ? error(queue, "front_queue called with an empty queue")
      : head(front_ptr);
  }

  function insert(item) {
    const new_pair = pair(item, null);

    if (is_empty()) {
      front_ptr = new_pair;
      rear_ptr = new_pair;
    } else {
      set_tail(rear_ptr, new_pair);
      rear_ptr = new_pair;
    }

    return dispatch;
  }

  function dele() {
    if (is_empty()) {
      error(queue, "delete_queue called with an empty queue");
    } else {
      front_ptr = tail(front_ptr);

      return dispatch;
    }
  }

  function print() {
    display(front_ptr);
  }

  function dispatch(m) {
    return m === "is_empty"
      ? is_empty()
      : m === "front"
        ? front()
        : m === "insert"
          ? insert
          : m === "delete"
            ? dele()
            : m === "print"
              ? print()
              : error(m, "undefined operation -- pair");
  }

  return dispatch;
}

function is_empty_queue(queue) {
  return queue("is_empty");
}

function front_queue(queue) {
  return queue("front");
}

function insert_queue(queue, item) {
  return queue("insert")(item);
}

function delete_queue(queue) {
  return queue("delete");
}

function print_queue(queue) {
  return queue("print");
}

export {
  delete_queue,
  front_queue,
  insert_queue,
  is_empty_queue,
  make_queue,
  print_queue,
};
