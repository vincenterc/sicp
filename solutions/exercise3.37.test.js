import { describe, expect, it } from "vitest";
import {
  forget_value,
  get_value,
  make_connector,
  set_value,
} from "./constraint-system.js";
import {
  cdiv,
  celsius_fahrenheit_converter,
  cminus,
  cmul,
  cv,
} from "./exercise3.37.js";

describe("exercise 3.37", () => {
  it("tests the function cminus", () => {
    const x = make_connector();
    const y = make_connector();
    const z = cminus(x, y);

    set_value(x, 10, "user");
    set_value(y, 5, "user");
    expect(get_value(z)).toBe(5);

    forget_value(x, "user");
    set_value(z, 10, "user");
    expect(get_value(x)).toBe(15);

    forget_value(y, "user");
    set_value(x, 30, "user");
    expect(get_value(y)).toBe(20);
  });

  it("tests the function cmul", () => {
    const x = make_connector();
    const y = make_connector();
    const z = cmul(x, y);

    set_value(x, 10, "user");
    set_value(y, 5, "user");
    expect(get_value(z)).toBe(50);

    forget_value(x, "user");
    set_value(z, 40, "user");
    expect(get_value(x)).toBe(8);

    forget_value(y, "user");
    set_value(x, 4, "user");
    expect(get_value(y)).toBe(10);
  });

  it("tests the function cdiv", () => {
    const x = make_connector();
    const y = make_connector();
    const z = cdiv(x, y);

    set_value(x, 10, "user");
    set_value(y, 2, "user");
    expect(get_value(z)).toBe(5);

    forget_value(x, "user");
    set_value(z, 3, "user");
    expect(get_value(x)).toBe(6);

    forget_value(y, "user");
    set_value(x, 9, "user");
    expect(get_value(y)).toBe(3);
  });

  it("tests the function cv", () => {
    const x = cv(10);

    expect(get_value(x)).toBe(10);
  });

  it("tests the function celsius_fahrenheit_converter", () => {
    const c = make_connector();
    const f = celsius_fahrenheit_converter(c);

    set_value(c, 100, "user");
    expect(get_value(f)).toBe(212);

    forget_value(c, "user");
    set_value(f, 32, "user");
    expect(get_value(c)).toBe(0);
  });
});
