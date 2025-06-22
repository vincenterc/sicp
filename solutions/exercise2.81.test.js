import { describe, expect, it } from "vitest";
import {
  exp,
  make_complex_from_real_imag,
  make_javascript_number,
} from "./exercise2.81.js";

describe("exercise 2.81", () => {
  it("tests the exp function", () => {
    expect(exp(make_javascript_number(2), make_javascript_number(3))).toEqual(
      make_javascript_number(8),
    );
    expect(() =>
      exp(make_complex_from_real_imag(1, 2), make_complex_from_real_imag(3, 4)),
    ).toThrow("no method for these types");
  });
});
