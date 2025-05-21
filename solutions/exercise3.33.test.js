import { describe, expect, it } from "vitest";
import {
  make_connector,
  set_value,
  get_value,
  forget_value,
  has_value,
} from "./constraint-system.js";
import { average } from "./exercise3.33.js";

describe("exercise 3.33", () => {
  it("tests the function average", () => {
    const a = make_connector();
    const b = make_connector();
    const c = make_connector();

    average(a, b, c);

    set_value(a, 10, "user");
    set_value(b, 20, "user");
    expect(get_value(c)).toBe(15);

    forget_value(a, "user");
    expect(has_value(a)).toBe(false);
    expect(has_value(b)).toBe(true);
    expect(has_value(c)).toBe(false);
    set_value(c, 30, "user");
    expect(get_value(a)).toBe(40);

    forget_value(b, "user");
    expect(has_value(a)).toBe(false);
    expect(has_value(b)).toBe(false);
    expect(has_value(c)).toBe(true);
    set_value(a, 10, "user");
    expect(get_value(b)).toBe(50);
  });
});
