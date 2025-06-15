// the n variable need to be protected
// a. in terms of mutexes
function make_semaphore(n) {
  const mutex = make_mutex();

  function the_semaphore(m) {
    if (m === "acquire") {
      mutex("acquire");
      if (n > 0) {
        n = n - 1;
        mutex("release");
        return true;
      } else {
        mutex("release");
        the_semaphore("acquire");
      }
    } else if (m === "release") {
      mutex("acquire");
      n = n + 1;
      mutex("release");
    } else {
      error(m, "unknown request -- semaphore");
    }
  }

  return the_semaphore;
}

// b. in terms of atomic test_and_set operations
function make_semaphore(n) {
  const cell = list(false);

  function the_semaphore(m) {
    if (m === "acquire") {
      if (test_and_set(cell)) {
        the_semaphore("acquire");
      } else {
        if (n > 0) {
          n = n - 1;
          clear(cell);
          return true;
        } else {
          clear(cell);
          the_semaphore("acquire");
        }
      }
    } else if (m === "release") {
      if (test_and_set(cell)) {
        the_semaphore("release");
      } else {
        n = n + 1;
        clear(cell);
      }
    } else {
      error(m, "unknown request -- semaphore");
    }
  }

  return the_semaphore;
}
