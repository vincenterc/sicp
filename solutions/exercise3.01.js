function make_accumulator(initial) {
  return (num) => {
    initial = initial + num;
    return initial;
  };
}

export { make_accumulator };
