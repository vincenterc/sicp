function f(g) {
  return g(2);
}

f(f);
// f(f)
// == f(2)
// == 2(2)
// == TypeError: g is not a function
