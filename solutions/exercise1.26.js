function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
    ? (expmod(base, exp / 2, m) * expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m;
}

// The interpreter uses the applicative-order evaluation,
// so expmod is evaluated twice at each step in the computation
// when the exp is even.
// Therefore the order of growth becomes O(2^log(n)) = O(n).
