function tree_to_list_2(tree) {
  function copy_to_list(tree, result_list) {
    return is_null(tree)
      ? result_list
      : copy_to_list(
          left_branch(tree),
          pair(entry(tree), copy_to_list(right_branch(tree), result_list)),
        );
  }
  return copy_to_list(tree, null);
}

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

function union_set(set1, set2) {
  if (is_null(set1)) {
    return set2;
  } else if (is_null(set2)) {
    return set1;
  } else {
    const x1 = head(set1);
    const x2 = head(set2);
    return x1 === x2
      ? pair(x1, union_set(tail(set1), tail(set2)))
      : x1 < x2
        ? pair(x1, union_set(tail(set1), set2))
        : pair(x2, union_set(set1, tail(set2)));
  }
}

function intersection_set(set1, set2) {
  if (is_null(set1) || is_null(set2)) {
    return null;
  } else {
    const x1 = head(set1);
    const x2 = head(set2);
    return x1 === x2
      ? pair(x1, intersection_set(tail(set1), tail(set2)))
      : x1 < x2
        ? intersection_set(tail(set1), set2)
        : // 𝚡𝟸 < 𝚡𝟷
          intersection_set(set1, tail(set2));
  }
}

function union_set_tree(tree1, tree2) {
  const l1 = tree_to_list_2(tree1);
  const l2 = tree_to_list_2(tree2);

  return list_to_tree(union_set(l1, l2));
}

function intersection_set_tree(tree1, tree2) {
  const l1 = tree_to_list_2(tree1);
  const l2 = tree_to_list_2(tree2);

  return list_to_tree(intersection_set(l1, l2));
}
