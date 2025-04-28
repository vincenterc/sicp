function make_monitored(f) {
  let counter = 0;

  function mf(m) {
    if (m === "how many calls") {
      return counter;
    } else if (m === "reset count") {
      counter = 0;

      return counter;
    } else {
      counter = counter + 1;

      return f(m);
    }
  }

  return mf;
}

export { make_monitored };
