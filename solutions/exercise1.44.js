const dx = 0.00001;

function compose(f, g) {
  return (x) => f(g(x));
}

function repeated(f, n) {
  return n === 1 ? f : compose(f, repeated(f, n - 1));
}

function smooth(f) {
  return (x) => (f(x - dx) + f(x) + f(x + dx)) / 3;
}

function n_fold_smoothed(f, n) {
  return repeated(smooth, n)(f);
}
