function conditional(predicate, then_clause, else_clause) {
  return predicate ? then_clause : else_clause;
}

function sqrt_iter(guess, x) {
  return conditional(
    is_good_enough(guess, x),
    guess,
    sqrt_iter(improve(guess, x), x),
  );
}

// The evaluation of sqrt_iter falls into an infinite loop.
// Due to the applicative-order evaluation, any call to conditional
// needs to evaluate its arguments, which will recursively call sqrt_iter.
// Thus conditional never gets applied.
