import { describe, expect, it } from "vitest";
import { list } from "sicp";
import { is_equal_to_zero, make_polynomial } from "./exercise2.87.js";

describe("exercise 2.87", () => {
  it("tests the is_equal_to_zero function", () => {
    expect(
      is_equal_to_zero(
        make_polynomial("x", list(list(100, 1), list(2, 2), list(0, 1))),
      ),
    ).toBe(false);
    expect(is_equal_to_zero(make_polynomial("x", null))).toBe(true);
    expect(
      is_equal_to_zero(
        make_polynomial("x", list(list(100, 0), list(2, 0), list(0, 0))),
      ),
    ).toBe(true);
  });
});
