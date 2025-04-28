function make_rand() {
  let x = random_init;

  return (arg) => {
    if (arg === "generate") {
      x = rand_update(x);

      return x;
    } else if (arg === "reset") {
      return (new_value) => (x = new_value);
    } else {
      return error(arg, "unknown argument -- make_rand");
    }
  };
}

const rand = make_rand();
