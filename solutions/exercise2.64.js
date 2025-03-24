function list_to_tree(elements) {
  return head(partial_tree(elements, length(elements)));
}

function partial_tree(elts, n) {
  if (n === 0) {
    return pair(null, elts);
  } else {
    const left_size = math_floor((n - 1) / 2);
    const left_result = partial_tree(elts, left_size);
    const left_tree = head(left_result);
    const non_left_elts = tail(left_result);
    const right_size = n - (left_size + 1);
    const this_entry = head(non_left_elts);
    const right_result = partial_tree(tail(non_left_elts), right_size);
    const right_tree = head(right_result);
    const remaining_elts = tail(right_result);
    return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts);
  }
}

// list_to_tree(list(1, 3, 5, 7, 9, 11))
//      5
//    /   \
//   1     9
//    \   /  \
//     3 7   11

// The order of growth of the function list_to_tree is O(n).