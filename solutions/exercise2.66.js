function lookup(given_key, tree_of_records) {
  return is_null(tree_of_records)
    ? false
    : given_key === key(entry(tree_of_records))
    ? entry(tree_of_records)
    : given_key < key(entry(tree_of_records))
    ? lookup(given_key, left_branch(tree_of_records))
    : // given_key > key(head(set_of_records))
      lookup(given_key, right_branch(tree_of_records));
}
