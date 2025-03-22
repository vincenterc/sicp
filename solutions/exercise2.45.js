function split(op, smaller_op) {
  function inner(painter, n) {
    if (n === 0) {
      return painter;
    } else {
      const smaller = inner(painter(n - 1));

      return op(painter, smaller_op(smaller, smaller));
    }
  }

  return inner;
}
