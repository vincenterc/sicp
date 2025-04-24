function install_raise_package() {
  put("raise", "integer", (n) => make_rational(n, 1));
  put("raise", "rational", (n) => make_real(number(n) / denom(n)));
  put("raise", "real", (n) => make_complex_from_real_imag(n, 0));

  return "done";
}

function raise(n) {
  const type = type_tag(n);

  return get("raise", type)(contents(n));
}
