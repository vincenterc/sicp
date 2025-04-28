function make_f() {
  let inner = 0;

  return (x) => {
    let temp = inner;
    inner = x;

    return temp;
  };
}

export { make_f };
