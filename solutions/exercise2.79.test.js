import { describe, expect, it } from "vitest";
import {
  is_equal,
  make_complex_from_mag_ang,
  make_complex_from_real_imag,
  make_javascript_number,
  make_rational,
} from "./exercise2.79.js";

describe("exercise 2.79", () => {
  it("tests the is_equal function", () => {
    expect(is_equal(make_javascript_number(3), make_javascript_number(3))).toBe(
      true,
    );
    expect(is_equal(make_javascript_number(3), make_javascript_number(4))).toBe(
      false,
    );
    expect(is_equal(make_rational(2, 3), make_rational(4, 6))).toBe(true);
    expect(is_equal(make_rational(2, 5), make_rational(4, 6))).toBe(false);
    expect(
      is_equal(
        make_complex_from_real_imag(1, 0),
        make_complex_from_mag_ang(1, 0),
      ),
    ).toBe(true);
    expect(
      is_equal(
        make_complex_from_real_imag(1, 1),
        make_complex_from_mag_ang(1, 0),
      ),
    ).toBe(false);
  });
});
