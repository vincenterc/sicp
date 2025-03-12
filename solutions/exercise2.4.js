function pair(x, y) {
  return (m) => m(x, y);
}

function head(z) {
  return z((p, q) => p);
}

// head(pair(x, y))
// == head(m => m(x, y))
// == (m => m(x, y))((p, q) => p)
// == ((p, q) => p)(x, y)
// == x

function tail(z) {
  return z((p, q) => q);
}
