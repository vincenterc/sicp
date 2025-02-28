function p() {
  return p();
}

function test(x, y) {
  return x === 0 ? 0 : y;
}

// applicative-order evaluation
// test(0, p()) -- evaluate p()
// == test(0, p()) -- evaluate p()
// == ...
// not terminate

// normal-order evaluation
// test(0, p())
// == 0 === 0 ? 0 : p()
// == true ? 0 : p()
// == 0
