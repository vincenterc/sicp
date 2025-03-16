import { display, head, is_number, is_pair, list, tail } from 'sicp';

function make_mobile(left, right) {
  return list(left, right);
}

function make_branch(length, structure) {
  return list(length, structure);
}

function left_branch(mobile) {
  return head(mobile);
}

function right_branch(mobile) {
  return head(tail(mobile));
}

function branch_length(branch) {
  return head(branch);
}

function branch_structure(branch) {
  return head(tail(branch));
}

function branch_weight(branch) {
  const structure = branch_structure(branch);

  return !is_pair(structure) ? structure : total_weight(structure);
}

function total_weight(mobile) {
  return (
    branch_weight(left_branch(mobile)) + branch_weight(right_branch(mobile))
  );
}

function balanced(mobile) {
  const l_branch = left_branch(mobile);
  const l_branch_structure = branch_structure(l_branch);
  const r_branch = right_branch(mobile);
  const r_branch_structure = branch_structure(r_branch);

  return (
    branch_length(l_branch) * branch_weight(l_branch) ===
      branch_length(r_branch) * branch_weight(r_branch) &&
    (!is_pair(l_branch_structure) || balanced(l_branch_structure)) &&
    (!is_pair(r_branch_structure) || balanced(r_branch_structure))
  );
}

display(
  balanced(
    make_mobile(
      make_branch(2, make_mobile(make_branch(2, 2), make_branch(2, 2))),
      make_branch(4, 2),
    ),
  ),
);

// For
// function make_mobile(left, right) {
//   return pair(left, right);
// }
// function make_branch(length, structure) {
//   return pair(length, structure);
// },
// need change
// function right_branch(mobile) {
//   return tail(mobile);
// }
// function right_branch(mobile) {
//   return tail(mobile);
// }.
