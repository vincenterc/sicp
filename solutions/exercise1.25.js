function expmod(base, exp, m) {
  return fast_expt(base, exp) % m;
}

// This version is fine for small numbers.
// But for large numbers, the computation may not be precise any more
// and may require special algorithms
// that are slower than the original version.
