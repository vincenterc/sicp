import { describe, expect, it } from "vitest";
import {
  forget_value,
  get_value,
  has_value,
  make_connector,
  set_value,
} from "./constraint-system.js";
import { squarer } from "./exercise3.35.js";

describe("exercise 3.35", () => {
  it("tests the function squarer", () => {
    const a = make_connector();
    const b = make_connector();

    squarer(a, b);

    set_value(a, 10, "user");
    expect(has_value(a)).toBe(true);
    expect(has_value(b)).toBe(true);
    expect(get_value(b)).toBe(100);

    forget_value(a, "user");
    expect(has_value(a)).toBe(false);
    expect(has_value(b)).toBe(false);

    set_value(b, 400, "user");
    expect(has_value(a)).toBe(true);
    expect(has_value(b)).toBe(true);
    expect(get_value(a)).toBe(20);
  });
});
