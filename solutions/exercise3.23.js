import {
  display,
  error,
  head,
  is_null,
  pair,
  set_head,
  set_tail,
  tail,
} from "sicp";

function make_ptr(data, prev, next) {
  return pair(data, pair(prev, next));
}

function item_ptr(ptr) {
  return head(ptr);
}

function prev_ptr(ptr) {
  return head(tail(ptr));
}

function next_ptr(ptr) {
  return tail(tail(ptr));
}

function set_prev_ptr(ptr, prev) {
  set_head(tail(ptr), prev);
}

function set_next_ptr(ptr, next) {
  set_tail(tail(ptr), next);
}

function make_deque() {
  return pair(null, null);
}

function front_ptr(deque) {
  return head(deque);
}

function rear_ptr(deque) {
  return tail(deque);
}

function set_front_ptr(deque, item) {
  set_head(deque, item);
}

function set_rear_ptr(deque, item) {
  set_tail(deque, item);
}

function is_empty_deque(deque) {
  return is_null(front_ptr(deque));
}

function front_deque(deque) {
  return is_empty_deque(deque)
    ? error(deque, "front_deque called with an empty deque")
    : item_ptr(front_ptr(deque));
}

function rear_deque(deque) {
  return is_empty_deque(deque)
    ? error(deque, "rear_deque called with an empty deque")
    : item_ptr(rear_ptr(deque));
}

function front_insert_deque(deque, item) {
  if (is_empty_deque(deque)) {
    const new_ptr = make_ptr(item, null, null);

    set_front_ptr(deque, new_ptr);
    set_rear_ptr(deque, new_ptr);
  } else {
    const new_ptr = make_ptr(item, null, front_ptr(deque));

    set_prev_ptr(front_ptr(deque), new_ptr);
    set_front_ptr(deque, new_ptr);
  }

  return deque;
}

function front_delete_deque(deque) {
  if (is_empty_deque(deque)) {
    error(deque, "front_delete_deque called with an empty deque");
  } else if (front_ptr(deque) === rear_ptr(deque)) {
    set_front_ptr(deque, null);
    set_rear_ptr(deque, null);

    return deque;
  } else {
    set_front_ptr(deque, next_ptr(front_ptr(deque)));
    set_prev_ptr(front_ptr(deque), null);

    return deque;
  }
}

function rear_insert_deque(deque, item) {
  if (is_empty_deque(deque)) {
    const new_ptr = make_ptr(item, null, null);

    set_front_ptr(deque, new_ptr);
    set_rear_ptr(deque, new_ptr);
  } else {
    const new_ptr = make_ptr(item, rear_ptr(deque), null);

    set_next_ptr(rear_ptr(deque), new_ptr);
    set_rear_ptr(deque, new_ptr);
  }

  return deque;
}

function rear_delete_deque(deque) {
  if (is_empty_deque(deque)) {
    error(deque, "rear_delete_deque called with an empty deque");
  } else if (front_ptr(deque) === rear_ptr(deque)) {
    set_front_ptr(deque, null);
    set_rear_ptr(deque, null);

    return deque;
  } else {
    set_rear_ptr(deque, prev_ptr(rear_ptr(deque)));
    set_next_ptr(rear_ptr(deque), null);

    return deque;
  }
}

function print_deque(deque) {
  function helper(ptr) {
    return is_null(ptr) ? null : pair(item_ptr(ptr), helper(next_ptr(ptr)));
  }

  display(helper(front_ptr(deque)));
}

export {
  make_deque,
  is_empty_deque,
  front_deque,
  rear_deque,
  front_insert_deque,
  front_delete_deque,
  rear_insert_deque,
  rear_delete_deque,
  print_deque,
};
