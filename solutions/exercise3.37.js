import {
  adder,
  constant,
  make_connector,
  multiplier,
} from "./constraint-system.js";

function celsius_fahrenheit_converter(x) {
  return cplus(cmul(cdiv(cv(9), cv(5)), x), cv(32));
}

function cplus(x, y) {
  const z = make_connector();

  adder(x, y, z);

  return z;
}

function cminus(x, y) {
  const z = make_connector();

  adder(z, y, x);

  return z;
}

function cmul(x, y) {
  const z = make_connector();

  multiplier(x, y, z);

  return z;
}

function cdiv(x, y) {
  const z = make_connector();

  multiplier(z, y, x);

  return z;
}

function cv(val) {
  const z = make_connector();

  constant(val, z);

  return z;
}

export { celsius_fahrenheit_converter, cminus, cmul, cdiv, cv };
